import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-extrabold text-gradient-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "XRAGENCY — Agence d'Innovation Digitale" },
      {
        name: "description",
        content:
          "Agence digitale internationale premium. Web, SEO, Google Maps, IA. Paris · New York · London · Tokyo. Réactivité 24h/24.",
      },
      { name: "author", content: "XRAGENCY" },
      { property: "og:title", content: "XRAGENCY — Agence d'Innovation Digitale" },
      { property: "og:description", content: "XRAGENCY Digital Elevate offers a premium digital agency website with advanced features." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "XRAGENCY — Agence d'Innovation Digitale" },
      { name: "description", content: "XRAGENCY Digital Elevate offers a premium digital agency website with advanced features." },
      { name: "twitter:description", content: "XRAGENCY Digital Elevate offers a premium digital agency website with advanced features." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2f7e8456-ea1d-460b-8bae-665c933e27c9/id-preview-9d85db9d--595cdb6b-50d0-430b-96a0-8365de412bb0.lovable.app-1776665773910.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2f7e8456-ea1d-460b-8bae-665c933e27c9/id-preview-9d85db9d--595cdb6b-50d0-430b-96a0-8365de412bb0.lovable.app-1776665773910.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-20">
          <Outlet />
        </main>
        <Footer />
        <WhatsAppButton />
        <Toaster theme="dark" position="top-right" richColors />
      </div>
    </LanguageProvider>
  );
}
