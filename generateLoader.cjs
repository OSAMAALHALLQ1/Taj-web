const fs = require('fs');
const path = require('path');

function processSVG(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Extract inner content of <svg ...> ... </svg>
    const match = content.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
    if (!match) return '';
    let inner = match[1];

    // Convert common attributes for React
    inner = inner.replace(/class=/g, 'className=')
                 .replace(/xmlns:xlink=/g, 'xmlnsXlink=')
                 .replace(/xml:space="preserve"/g, '')
                 .replace(/xlink:href=/g, 'xlinkHref=')
                 .replace(/clip-path=/g, 'clipPath=')
                 .replace(/enable-background="[^"]*"/g, '');

    inner = inner.replace(/style=""/g, '');

    return inner;
}

const restInner = processSVG('public/logos/rest-main.svg');
const cafeInner = processSVG('public/logos/cafe-main.svg');

const componentCode = `
import React, { useEffect, useState } from 'react';

export interface LoaderProps {
  isLoading: boolean;
  theme?: "restaurant" | "cafe";
}

export const AnimatedLogoLoader: React.FC<LoaderProps> = ({ isLoading, theme = "restaurant" }) => {
  const [shouldRender, setShouldRender] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 700);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div 
      className={\`fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md transition-opacity duration-700 \${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}\`}
    >
      <style>{\`
        .animated-logo svg {
          width: 300px;
          height: auto;
          max-width: 80vw;
          overflow: visible;
        }

        .animated-logo path, 
        .animated-logo polygon, 
        .animated-logo circle, 
        .animated-logo rect,
        .animated-logo g > * {
          opacity: 0;
          transform-origin: center;
          animation-fill-mode: forwards;
        }

        \${Array.from({ length: 150 }).map((_, i) => \`
          .animated-logo path:nth-of-type(\${i + 1}),
          .animated-logo polygon:nth-of-type(\${i + 1}),
          .animated-logo g > *:nth-of-type(\${i + 1}) {
            animation-delay: \${i * 0.04}s;
          }
        \`).join('')}

        .theme-loader-restaurant path,
        .theme-loader-restaurant polygon,
        .theme-loader-restaurant circle,
        .theme-loader-restaurant rect,
        .theme-loader-restaurant g > * {
          animation-name: royalReveal;
          animation-duration: 1.5s;
          animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1);
        }

        @keyframes royalReveal {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .theme-loader-cafe path,
        .theme-loader-cafe polygon,
        .theme-loader-cafe circle,
        .theme-loader-cafe rect,
        .theme-loader-cafe g > * {
          animation-name: bouncyReveal;
          animation-duration: 1.2s;
          animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes bouncyReveal {
          0% {
            opacity: 0;
            transform: scale(0.6) translateY(30px);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      \`}</style>

      <div className={\`animated-logo \${theme === 'restaurant' ? 'theme-loader-restaurant' : 'theme-loader-cafe'}\`}>
        {theme === 'restaurant' ? (
          <svg viewBox="0 0 3061.42 3061.42" xmlns="http://www.w3.org/2000/svg">
            <g className="royal-crown-group">
              ${restInner.replace(/`/g, '\\`').replace(/\$/g, '\\$')}
            </g>
          </svg>
        ) : (
          <svg viewBox="0 0 3061.4 3061.4" xmlns="http://www.w3.org/2000/svg">
            <g className="cafe-bouncy-group">
              ${cafeInner.replace(/`/g, '\\`').replace(/\$/g, '\\$')}
            </g>
          </svg>
        )}
      </div>
    </div>
  );
};
`;

fs.writeFileSync('src/components/AnimatedLogoLoader.tsx', componentCode);
console.log('Successfully generated AnimatedLogoLoader.tsx');
