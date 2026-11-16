import type { ReactNode } from 'react';

type IconName =
  | 'overview'
  | 'families'
  | 'care'
  | 'stock'
  | 'stay'
  | 'arrow'
  | 'chevron'
  | 'bell'
  | 'plus'
  | 'calendar'
  | 'box'
  | 'check'
  | 'close'
  | 'menu'
  | 'spark';

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
};

const drawings: Record<IconName, ReactNode> = {
  overview: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  families: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  care: <><path d="M20.8 8.6c0 5.1-8.8 11-8.8 11s-8.8-5.9-8.8-11A4.6 4.6 0 0 1 12 6.1a4.6 4.6 0 0 1 8.8 2.5Z" /><path d="M12 8v6M9 11h6" /></>,
  stock: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5M12 13v8" /></>,
  stay: <><path d="M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" /><path d="M3 16h18M7 10V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" /><path d="M5 20v1M19 20v1" /></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  chevron: <path d="m9 18 6-6-6-6" />,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  box: <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="m4.3 7.6 7.7 4.3 7.7-4.3M12 12v9" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  close: <><path d="m18 6-12 12M6 6l12 12" /></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  spark: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z" /><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" /></>,
};

export function Icon({ name, size = 20, className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
    >
      {drawings[name]}
    </svg>
  );
}
