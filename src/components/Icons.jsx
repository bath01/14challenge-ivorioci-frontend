// Icones SVG réutilisables — API identique à react-icons
// Chaque icone accepte : size, color, style, className

// ——— Recherche ———
export const FiSearch = ({ size = 16, color = 'currentColor', ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
  </svg>
);

// ——— Fermer ———
export const FiX = ({ size = 16, color = 'currentColor', ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M18 6L6 18" /><path d="M6 6l12 12" />
  </svg>
);

// ——— Menu hamburger ———
export const FiMenu = ({ size = 16, color = 'currentColor', ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" />
  </svg>
);

// ——— Play (rempli) ———
export const FiPlay = ({ size = 16, color = 'currentColor', ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none" {...p}>
    <polygon points="5,3 19,12 5,21" />
  </svg>
);

// ——— Pause (rempli) ———
export const FiPause = ({ size = 16, color = 'currentColor', ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none" {...p}>
    <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
  </svg>
);

// ——— Skip back ———
export const FiSkipBack = ({ size = 16, color = 'currentColor', ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none" {...p}>
    <rect x="3" y="5" width="3" height="14" /><polygon points="20,5 8,12 20,19" />
  </svg>
);

// ——— Skip forward ———
export const FiSkipForward = ({ size = 16, color = 'currentColor', ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none" {...p}>
    <rect x="18" y="5" width="3" height="14" /><polygon points="4,5 16,12 4,19" />
  </svg>
);

// ——— Plein ecran ———
export const FiMaximize = ({ size = 16, color = 'currentColor', ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M8 3H5a2 2 0 00-2 2v3" /><path d="M21 8V5a2 2 0 00-2-2h-3" />
    <path d="M3 16v3a2 2 0 002 2h3" /><path d="M16 21h3a2 2 0 002-2v-3" />
  </svg>
);

// ——— Etoile (outline ou remplie) ———
export const FiStar = ({ size = 16, color = 'currentColor', filled = false, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

// ——— Horloge ———
export const FiClock = ({ size = 16, color = 'currentColor', ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
);

// ——— Filtre ———
export const FiFilter = ({ size = 16, color = 'currentColor', ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
  </svg>
);

// ——— Chevron haut ———
export const FiChevronUp = ({ size = 16, color = 'currentColor', ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M18 15l-6-6-6 6" />
  </svg>
);

// ——— Chevron bas ———
export const FiChevronDown = ({ size = 16, color = 'currentColor', ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

// ——— Fleche droite ———
export const FiArrowRight = ({ size = 16, color = 'currentColor', ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
  </svg>
);

// ——— Film ———
export const FiFilm = ({ size = 16, color = 'currentColor', ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
    <path d="M7 2v20" /><path d="M17 2v20" /><path d="M2 12h20" />
    <path d="M2 7h5" /><path d="M2 17h5" /><path d="M17 17h5" /><path d="M17 7h5" />
  </svg>
);

// ——— Check ———
export const FiCheck = ({ size = 16, color = 'currentColor', ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

// ——— Volume (son actif) ———
export const FiVolume2 = ({ size = 16, color = 'currentColor', ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill={color} stroke="none" />
    <path d="M15.54 8.46a5 5 0 010 7.07" /><path d="M19.07 4.93a10 10 0 010 14.14" />
  </svg>
);

// ——— Volume mute ———
export const FiVolumeX = ({ size = 16, color = 'currentColor', ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill={color} stroke="none" />
    <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

// ——— Log out ———
export const FiLogOut = ({ size = 16, color = 'currentColor', ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

// ——— User ———
export const FiUser = ({ size = 16, color = 'currentColor', ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

// ——— Aliases pour compatibilité avec les anciens noms ———
export const SearchIcon = FiSearch;
export const CloseIcon = FiX;
export const MenuIcon = FiMenu;
export const PlayIcon = FiPlay;
export const PauseIcon = FiPause;
export const SkipBackIcon = FiSkipBack;
export const SkipForwardIcon = FiSkipForward;
export const FullscreenIcon = FiMaximize;
export const StarIcon = FiStar;
export const ClockIcon = FiClock;
export const FilterIcon = FiFilter;
export const ChevronUpIcon = FiChevronUp;
export const ChevronDownIcon = FiChevronDown;
export const ArrowRightIcon = FiArrowRight;
export const FilmIcon = FiFilm;
export const CheckIcon = FiCheck;
export const VolumeIcon = FiVolume2;
export const VolumeMuteIcon = FiVolumeX;
