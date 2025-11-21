import React from 'react';

interface OliveBranchProps {
  className?: string;
  style?: React.CSSProperties;
}

export const OliveBranch: React.FC<OliveBranchProps> = ({ className = '', style }) => {
  return (
    <svg
      className={`olive-motif ${className}`}
      style={style}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M60 10 C 50 30, 40 40, 30 50 C 25 55, 20 60, 25 65 C 30 70, 35 65, 40 60 C 50 50, 60 40, 70 30 M60 10 C 70 30, 80 40, 90 50 C 95 55, 100 60, 95 65 C 90 70, 85 65, 80 60 C 70 50, 60 40, 50 30"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="28" cy="48" rx="4" ry="6" fill="hsl(var(--primary))" opacity="0.6" />
      <ellipse cx="38" cy="58" rx="4" ry="6" fill="hsl(var(--primary))" opacity="0.6" />
      <ellipse cx="45" cy="52" rx="3" ry="5" fill="hsl(var(--primary))" opacity="0.5" />
      <ellipse cx="92" cy="48" rx="4" ry="6" fill="hsl(var(--primary))" opacity="0.6" />
      <ellipse cx="82" cy="58" rx="4" ry="6" fill="hsl(var(--primary))" opacity="0.6" />
      <ellipse cx="75" cy="52" rx="3" ry="5" fill="hsl(var(--primary))" opacity="0.5" />
    </svg>
  );
};
