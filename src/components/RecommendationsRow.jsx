// Recommandations générées localement à partir des vidéos du store
// Pas besoin d'API — algorithme basé sur les genres, la catégorie et la date
import { useMemo } from 'react';
import { useVideoStore } from '../store/useVideoStore';
import VideoCard from './VideoCard';
import SkeletonCard from './SkeletonCard';

const CI_O = '#FF8C00';
const CI_G = '#009E49';
const TEXT_P = '#F0EDE6';
const TEXT_DIM = '#444444';
const TEXT_S = '#777777';
const CARD = '#1A1A22';
const BORDER = '#2A2A35';

// En-tête réutilisable pour chaque section
function SectionHeader({ icon, title, badge, badgeColor, count }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', marginBottom: 14,
    }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: TEXT_P, margin: 0 }}>
        <span style={{ marginRight: 8 }}>{icon}</span>
        {title}
        {badge && (
          <span style={{
            fontSize: 10, marginLeft: 10, padding: '3px 8px',
            borderRadius: 6, background: `${badgeColor}15`, color: badgeColor,
            fontWeight: 600, verticalAlign: 'middle',
          }}>{badge}</span>
        )}
      </h2>
      {count > 0 && (
        <span style={{ fontSize: 11, color: TEXT_DIM }}>{count} vidéos</span>
      )}
    </div>
  );
}

export default function RecommendationsRow() {
  const { videos, watchHistory, watchList, isLoadingVideos } = useVideoStore();

  // Génère les recommandations localement à chaque changement
  const { popular, newReleases, forYou } = useMemo(() => {
    if (!videos || videos.length === 0) {
      return { popular: [], newReleases: [], forYou: [] };
    }

    // ——— Populaires : mélange aléatoire des vidéos (simulé) ———
    const shuffled = [...videos]
      .sort((a, b) => {
        // Trie par un hash pseudo-aléatoire basé sur le titre
        const hashA = a.title.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
        const hashB = b.title.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
        return hashB % 7 - hashA % 7;
      })
      .slice(0, 6);

    // ——— Nouveautés : triées par date de sortie ———
    const newReleases = [...videos]
      .sort((a, b) => {
        const dateA = a.releaseDate || a.release_date || '0';
        const dateB = b.releaseDate || b.release_date || '0';
        return dateB.localeCompare(dateA);
      })
      .slice(0, 6);

    // ——— Pour vous : basé sur les genres de la watchlist ———
    let forYou = [];
    if (watchList.length > 0) {
      // Récupère les genres des vidéos en watchlist
      const likedGenres = new Set();
      watchList.forEach(videoId => {
        const v = videos.find(vid => vid.id === videoId);
        if (v && v.genres) {
          v.genres.forEach(g => likedGenres.add(g));
        }
      });

      // Score les vidéos par nombre de genres en commun
      forYou = videos
        .filter(v => !watchList.includes(v.id))
        .map(v => {
          const score = (v.genres || []).filter(g => likedGenres.has(g)).length;
          return { video: v, score };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 6)
        .map(({ video }) => video);
    }

    return { popular: shuffled, newReleases, forYou };
  }, [videos, watchList, watchHistory]);

  // Chargement
  if (isLoadingVideos || !videos || videos.length === 0) {
    return (
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
          {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  const hasContent = popular.length > 0 || newReleases.length > 0 || forYou.length > 0;

  if (!hasContent) {
    return (
      <div style={{
        textAlign: 'center', padding: '40px 20px',
        borderRadius: 16, background: CARD,
        border: `1px solid ${BORDER}`, marginBottom: 36,
      }}>
        <span style={{ fontSize: 40, display: 'block', marginBottom: 12 }}>🎬</span>
        <p style={{ fontSize: 14, color: TEXT_S, margin: 0 }}>
          Aucune vidéo disponible pour le moment.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ——— Pour vous (si watchlist non vide) ——— */}
      {forYou.length > 0 && (
        <div style={{ marginBottom: 36 }}>
          <SectionHeader
            icon="✨" title="Parce que vous aimez"
            badge="Pour vous" badgeColor={CI_O}
            count={forYou.length}
          />
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
            {forYou.map(v => <VideoCard key={v.id} video={v} />)}
          </div>
        </div>
      )}

      {/* ——— Populaires ——— */}
      {popular.length > 0 && (
        <div style={{ marginBottom: 36 }}>
          <SectionHeader
            icon="🔥" title="Populaires"
            badge="TOP" badgeColor={CI_G}
            count={popular.length}
          />
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
            {popular.map(v => <VideoCard key={v.id} video={v} />)}
          </div>
        </div>
      )}

      {/* ——— Nouveautés ——— */}
      {newReleases.length > 0 && (
        <div style={{ marginBottom: 36 }}>
          <SectionHeader
            icon="🆕" title="Ajoutés récemment"
            count={newReleases.length}
          />
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
            {newReleases.map(v => <VideoCard key={v.id} video={v} />)}
          </div>
        </div>
      )}
    </>
  );
}
