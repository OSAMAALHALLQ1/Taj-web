interface Props extends React.SVGAttributes<SVGSVGElement> {
  className?: string;
  size?: number;
}

export function CrownLogo({ className, size = 48, ...rest }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      <defs>
        <linearGradient id="crown-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <path
        d="M8 22 L18 36 L26 16 L32 38 L38 16 L46 36 L56 22 L52 48 L12 48 Z"
        fill="url(#crown-grad)"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="22" r="2.5" fill="currentColor" />
      <circle cx="32" cy="14" r="2.5" fill="currentColor" />
      <circle cx="56" cy="22" r="2.5" fill="currentColor" />
      <rect x="12" y="50" width="40" height="3" rx="1" fill="currentColor" />
    </svg>
  );
}
