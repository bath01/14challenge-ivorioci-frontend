// components/SecureVideoPlayer.jsx
// Lecteur vidéo sécurisé avec streaming authentifié et contrôle audio
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { catalogueService } from '../services/api';

const CI_O = '#FF8C00';
const TEXT_P = '#F0EDE6';

const SecureVideoPlayer = forwardRef(({ videoId, autoPlay = false, onTimeUpdate, onEnded, onLoadedMetadata }, ref) => {
  const [streamUrl, setStreamUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const isFirstLoad = useRef(true);
  const loadInProgress = useRef(false);

  // Expose la référence vidéo au parent
  useImperativeHandle(ref, () => videoRef.current);

  // Rafraîchit le token JWT si expiré
  const tryRefreshToken = async () => {
    try {
      const rt = localStorage.getItem('refreshToken');
      if (!rt) return false;

      const response = await fetch('https://api.ivorioci.chalenge14.com/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: rt }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.data) {
        localStorage.setItem('token', data.data.accessToken);
        if (data.data.refreshToken) {
          localStorage.setItem('refreshToken', data.data.refreshToken);
        }
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Charge la vidéo avec authentification
  const loadVideoWithToken = async (retryCount = 0) => {
    if (loadInProgress.current) return;
    loadInProgress.current = true;

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Non authentifié — veuillez vous connecter');

      const url = catalogueService.getStreamUrl(videoId);

      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      // Token expiré — tente un refresh
      if (response.status === 401 && retryCount === 0) {
        const refreshed = await tryRefreshToken();
        if (refreshed) {
          loadInProgress.current = false;
          return loadVideoWithToken(1);
        }
        throw new Error('Session expirée, veuillez vous reconnecter');
      }

      if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);

      const contentType = response.headers.get('Content-Type') || '';
      const blob = await response.blob();

      // Force le type MIME correct pour préserver la qualité audio
      const correctedBlob = new Blob([blob], {
        type: contentType.includes('video') ? contentType : 'video/mp4',
      });

      // Nettoie l'ancienne URL blob
      if (streamUrl) URL.revokeObjectURL(streamUrl);

      const objectUrl = URL.createObjectURL(correctedBlob);
      setStreamUrl(objectUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      loadInProgress.current = false;
    }
  };

  // Recharge à chaque changement de vidéo
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setStreamUrl(null);
    isFirstLoad.current = true;
    loadVideoWithToken();

    return () => {
      if (streamUrl) URL.revokeObjectURL(streamUrl);
    };
  }, [videoId]);

  // AutoPlay une fois la vidéo prête
  useEffect(() => {
    if (!videoRef.current || isLoading || !streamUrl) return;

    const video = videoRef.current;

    const handleCanPlay = () => {
      if (autoPlay && isFirstLoad.current) {
        video.play()
          .then(() => { isFirstLoad.current = false; })
          .catch(() => { isFirstLoad.current = false; });
      }
      video.removeEventListener('canplay', handleCanPlay);
    };

    video.addEventListener('canplay', handleCanPlay);
    if (video.readyState >= 3) handleCanPlay();

    return () => video.removeEventListener('canplay', handleCanPlay);
  }, [autoPlay, isLoading, streamUrl]);

  // ——— États d'affichage ———

  if (isLoading) {
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#000', flexDirection: 'column', gap: 16,
      }}>
        <div style={{
          width: 40, height: 40,
          border: `3px solid ${CI_O}20`,
          borderTop: `3px solid ${CI_O}`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
        <div style={{ color: TEXT_P, fontSize: 14 }}>Chargement de la vidéo...</div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#000', flexDirection: 'column', gap: 16,
      }}>
        <div style={{ fontSize: 48 }}>⚠️</div>
        <div style={{ color: '#ff6b6b', fontSize: 14, textAlign: 'center', maxWidth: 300 }}>
          {error}
        </div>
        <button
          onClick={() => window.location.href = '/login'}
          style={{
            padding: '8px 20px', borderRadius: 8, border: 'none',
            background: CI_O, color: '#FFF', cursor: 'pointer',
            fontSize: 12, fontWeight: 600,
          }}>
          Se reconnecter
        </button>
      </div>
    );
  }

  if (!streamUrl) {
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#000',
      }}>
        <div style={{ color: TEXT_P }}>Aucune vidéo disponible</div>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      src={streamUrl}
      preload="auto"
      volume={1.0}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        backgroundColor: '#000',
      }}
      onTimeUpdate={onTimeUpdate}
      onEnded={onEnded}
      onLoadedMetadata={(e) => {
        // S'assure que le volume est au max au chargement
        e.currentTarget.volume = 1.0;
        e.currentTarget.muted = false;
        if (onLoadedMetadata) onLoadedMetadata(e);
      }}
    />
  );
});

SecureVideoPlayer.displayName = 'SecureVideoPlayer';

export default SecureVideoPlayer;
