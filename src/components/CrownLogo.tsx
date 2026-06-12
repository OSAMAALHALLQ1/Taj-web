import React from "react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  size?: number;
}

export function CrownLogo({ className, size = 48, ...rest }: Props) {
  return (
    <img
      src="/logos/taj-group.png"
      className={className}
      style={{ width: size, height: size, objectFit: "contain" }}
      alt="Al Taj Logo"
      {...rest}
    />
  );
}

