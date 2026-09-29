import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  useHydrated,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

export const navLinks = [
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
] as const;

export function LynxMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#11151D" stroke="#242A35" />
      <polygon points="7,41 23,23 31,31 15,49" fill="#8B5CF6" />
      <polygon points="33,41 49,23 57,31 41,49" fill="#8B5CF6" />
      <polygon points="17,37 23,31 27,35 21,41" fill="#A78BFA" />
      <polygon points="43,37 49,31 53,35 47,41" fill="#A78BFA" />
    </svg>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <Link to="/" className="flex items-center gap-2.5" aria-label="LYNXDEVOPS home">
          <LynxMark />
          <span className="font-display text-[15px] font-semibold tracking-[0.14em] text-foreground">
            LYNXDEVOPS
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-[13px] text-secondary transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/diagnostic"
            className="hidden rounded-md bg-primary px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Get my free diagnostic
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-border bg-background px-5 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="block rounded-md px-3 py-2.5 text-sm text-secondary transition-colors hover:bg-secondary hover:text-foreground"
                  activeProps={{ className: "text-foreground bg-secondary" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                to="/diagnostic"
                className="block rounded-md bg-primary px-3 py-2.5 text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-primary-foreground"
              >
                Get my free diagnostic
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <LynxMark className="h-6 w-6" />
              <span className="font-display text-sm font-semibold tracking-[0.14em]">
                LYNXDEVOPS
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-dim">
              Streaming systems, creator infrastructure and channel optimization.
            </p>
          </div>
          <nav aria-label="Footer">
            <p className="eyebrow">Studio</p>
            <ul className="mt-4 space-y-2.5 text-sm text-secondary">
              <li><Link to="/work" className="transition-colors hover:text-foreground">Work</Link></li>
              <li><Link to="/services" className="transition-colors hover:text-foreground">Services</Link></li>
              <li><Link to="/how-it-works" className="transition-colors hover:text-foreground">How It Works</Link></li>
              <li><Link to="/about" className="transition-colors hover:text-foreground">About</Link></li>
              <li><Link to="/faq" className="transition-colors hover:text-foreground">FAQ</Link></li>
              <li><Link to="/privacy" className="transition-colors hover:text-foreground">Privacy</Link></li>
              <li><Link to="/terms" className="transition-colors hover:text-foreground">Terms</Link></li>
            </ul>
          </nav>
          <div>
            <p className="eyebrow">Platforms</p>
            <ul className="mt-4 space-y-2.5 text-sm text-secondary">
              <li>Twitch</li>
              <li>KICK</li>
              <li>YouTube</li>
            </ul>
            <p className="eyebrow mt-8">Enquiries</p>
            <p className="mt-4 text-sm text-secondary">hello@[YOUR-DOMAIN]</p>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LYNXDEVOPS. All rights reserved.</p>
          <p>Built for Twitch, KICK &amp; YouTube</p>
        </div>
      </div>
    </footer>
  );
}

function MobileStickyCta() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hydrated = useHydrated();
  if (!hydrated || pathname.startsWith("/diagnostic") || pathname.startsWith("/admin")) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-md sm:hidden">
      <Link
        to="/diagnostic"
        className="block rounded-md bg-primary py-3 text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-primary-foreground"
      >
        Get my free diagnostic
      </Link>
    </div>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-5">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-foreground">
          This page doesn't exist.
        </h1>
        <p className="mt-3 text-sm text-secondary">
          The page you're looking for has moved or never existed.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex rounded-md border border-border px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:border-purple-bright"
          >
            Back to home
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
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-5">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-semibold text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-secondary">
          Something went wrong on our end. Try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-primary px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-primary-foreground"
          >
            Try again
          </button>
          <Link
            to="/"
            className="rounded-md border border-border px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground"
          >
            Go home
          </Link>
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
      { title: "LYNXDEVOPS — Streaming Systems for Twitch, KICK & YouTube Creators" },
      {
        name: "description",
        content:
          "Technical channel diagnostics, OBS optimization, streaming systems, creator branding, Discord infrastructure and creator technology support for Twitch, KICK and YouTube.",
      },
      { property: "og:title", content: "LYNXDEVOPS — Your Stream, Engineered." },
      {
        property: "og:description",
        content:
          "Premium streaming systems studio for Twitch, KICK and YouTube creators. Channel diagnostics, OBS optimization, creator systems and streaming infrastructure.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1 pb-16 sm:pb-0">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <Footer />
        <MobileStickyCta />
      </div>
    </QueryClientProvider>
  );
}
