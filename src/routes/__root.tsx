import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { CrownLogo } from "../components/CrownLogo";
import { AnimatedLogoLoader } from "../components/AnimatedLogoLoader";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div dir="rtl" className="flex min-h-screen items-center justify-center bg-[#050303] px-4 font-arabic text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,.28)_48%,rgba(0,0,0,.95)_100%)] pointer-events-none" />
      <div className="max-w-md text-center relative z-10">
        <h1 className="text-[120px] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] to-[#8A2B2C] leading-none mb-4">404</h1>
        <h2 className="mt-4 text-3xl font-display font-extrabold text-white">الصفحة غير موجودة</h2>
        <p className="mt-4 text-sm text-gray-400 leading-relaxed">
          عذراً، يبدو أنك ضللت الطريق. الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#8A2B2C] px-8 py-3.5 text-sm font-bold text-white transition-all hover:opacity-90 shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] hover:-translate-y-1"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Tajawal:wght@300;400;500;700;800;900&family=Cairo:wght@400;600;700;800;900&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "مجموعة التاج",
    "image": "https://taj-group.com/logos/restaurant-logo.svg",
    "url": "https://taj-group.com",
    "telephone": "+970590000000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Gaza",
      "addressCountry": "PS"
    },
    "servesCuisine": ["Fast Food", "Cafe", "Middle Eastern"]
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [booting, setBooting] = useState(true);
  const router = useRouter();
  
  // Determine theme from URL (either path /cafe or search query ?branch=cafe)
  const isCafe = router.state.location.pathname?.includes('cafe') || false;

  useEffect(() => {
    // Keep loader on screen long enough for SVG animation sequence
    const timer = window.setTimeout(() => setBooting(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatedLogoLoader isLoading={booting} theme={isCafe ? "cafe" : "restaurant"} />
      <div className={booting ? "app-enter is-waiting" : "app-enter"}>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}
