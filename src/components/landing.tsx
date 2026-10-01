import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  SlidersHorizontal,
  LayoutTemplate,
  Users,
  BarChart3,
  ArrowRight,
  ArrowDown,
  Mail,
  MessageCircle,
} from "lucide-react";
import {
  problemAreas,
  services,
  processSteps,
  whyPillars,
  platforms,
  testimonials,
  creatorNames,
  faqs,
  sampleDiagnostic,
} from "@/lib/content";

const bannerAsset = { url: "/media/lynxdevops-banner.jpg" };
const creatorVideoAsset = { url: "/media/lynxdevops-intro.mp4" };
const creatorVideoPosterAsset = { url: "/media/brand-glow.jpg" };
const setupOneAsset = { url: "/media/setup-1.jpg" };
const setupTwoAsset = { url: "/media/setup-2.jpg" };
const setupThreeAsset = { url: "/media/setup-3.jpg" };

/* ---------- primitives ---------- */

const iconMap = {
  sliders: SlidersHorizontal,
  layout: LayoutTemplate,
  users: Users,
  chart: BarChart3,
} as const;

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function PrimaryCta({
  to = "/diagnostic",
  children = "GET MY FREE CHANNEL DIAGNOSTIC",
  className = "",
}: {
  to?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90 ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

export function GhostCta({
  to = "/how-it-works",
  children = "SEE HOW IT WORKS",
}: {
  to?: string;
  children?: ReactNode;
}) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:border-purple-bright"
    >
      {children}
    </Link>
  );
}

function SectionHead({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {lead && <p className="mt-4 text-[15px] leading-relaxed text-secondary">{lead}</p>}
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  const color =
    status === "REVIEWED"
      ? "bg-green"
      : status === "OPPORTUNITY"
        ? "bg-purple-bright"
        : "bg-foreground/60";
  return <span className={`inline-block h-1.5 w-1.5 rounded-full ${color}`} aria-hidden="true" />;
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded border border-border bg-surface px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-secondary">
      {children}
    </span>
  );
}

/* ---------- hero ---------- */

function DiagnosticConsole() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-surface shadow-2xl shadow-black/40">
      {/* header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green" aria-hidden="true" />
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-secondary">
            Channel Diagnostic
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.14em] text-dim">DEMO DATA</span>
      </div>

      {/* scan flow */}
      <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
        {["SCAN", "DIAGNOSE", "IMPROVE"].map((step, i) => (
          <div key={step} className="flex flex-col items-center gap-1 px-2 py-3">
            <span className="font-display text-[11px] font-semibold tracking-[0.16em] text-foreground">
              {step}
            </span>
            <span className="text-[9px] uppercase tracking-[0.14em] text-dim">
              {["in progress", "queued", "queued"][i]}
            </span>
            <div className="h-0.5 w-10 overflow-hidden rounded bg-border">
              <div
                className={`h-full rounded bg-purple-bright ${i === 0 ? "w-3/4" : "w-0"}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* categories */}
      <ul className="divide-y divide-border/70">
        {sampleDiagnostic.map((row) => (
          <li key={row.category} className="flex items-center justify-between gap-3 px-4 py-2.5">
            <div className="flex items-center gap-2.5">
              <StatusDot status={row.status} />
              <span className="text-[11px] font-medium tracking-[0.08em] text-foreground">
                {row.category}
              </span>
            </div>
            <span className="text-right text-[10px] text-dim">
              {row.note}
              <span className="ml-2 hidden text-[9px] uppercase tracking-[0.12em] text-secondary sm:inline">
                {row.status}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div className="border-t border-border px-4 py-2.5 text-[9px] uppercase tracking-[0.18em] text-dim">
        Sample diagnostic view — not real client data
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <img
        src={setupOneAsset.url}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-30 md:object-[center_42%] md:opacity-40"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/90 to-background md:bg-gradient-to-r md:from-background md:via-background/90 md:to-background/55"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div className="absolute inset-0 radial-glow opacity-80" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-32 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:pt-40">
        <div>
          <p className="eyebrow">LYNXDEVOPS / STREAMING SYSTEMS STUDIO</p>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            YOUR STREAM,
            <br />
            <span className="text-purple-bright">ENGINEERED.</span>
          </h1>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-secondary">
            Technical channel diagnostics, OBS optimization, creator systems and streaming
            infrastructure for Twitch, KICK and YouTube.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryCta />
            <GhostCta />
          </div>
          <p className="mt-5 text-[11px] tracking-[0.06em] text-dim">
            No bots &bull; No fake engagement &bull; No guaranteed outcomes
          </p>
        </div>
        <Reveal className="md:justify-self-end" delay={150}>
          <DiagnosticConsole />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- trust strip ---------- */

export function TrustStrip() {
  return (
    <section className="border-b border-border bg-ink">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-[1.1fr_1fr] md:px-8">
        <h2 className="font-display text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
          SERIOUS STREAMING DESERVES MORE THAN PATCHWORK FIXES.
        </h2>
        <div>
          <p className="text-[15px] leading-relaxed text-secondary">
            Your content can be strong while the system around it is slowing you down. LYNXDEVOPS
            helps identify the technical, visual and workflow issues that make a stream harder to
            run, harder to understand, or harder to improve.
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {["REAL CHANNEL REVIEW", "TECHNICAL SYSTEMS", "HUMAN SUPPORT"].map((pillar) => (
              <li
                key={pillar}
                className="border-l-2 border-purple-bright/50 pl-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground"
              >
                {pillar}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- problem ---------- */

function FlowChain({ items }: { items: readonly string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="System flow">
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-2">
          <Chip>{item}</Chip>
          {i < items.length - 1 && (
            <ArrowRight className="h-3.5 w-3.5 text-purple-bright" aria-hidden="true" />
          )}
        </span>
      ))}
    </div>
  );
}

export function ProblemSection() {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[0.85fr_1.15fr] md:px-8">
        <div className="md:sticky md:top-28 md:self-start">
          <SectionHead
            eyebrow="WHAT WE LOOK FOR"
            title={<>THE PROBLEM ISN'T ALWAYS THE CONTENT.</>}
          />
          <div className="mt-8 hidden md:block">
            <FlowChain
              items={["CONTENT", "STREAM SETUP", "PRESENTATION", "COMMUNITY", "WORKFLOW"]}
            />
          </div>
        </div>
        <ol className="relative">
          {problemAreas.map((area, i) => {
            const Icon = iconMap[area.icon];
            return (
              <li
                key={area.number}
                className={`flex gap-5 py-7 ${i > 0 ? "border-t border-border" : ""}`}
              >
                <span className="font-display text-sm text-purple-bright">{area.number}</span>
                <div>
                  <div className="flex items-center gap-3">
                    <Icon className="h-4.5 w-4.5 text-secondary" aria-hidden="true" />
                    <h3 className="font-display text-lg font-semibold tracking-[0.04em] text-foreground">
                      {area.title}
                    </h3>
                  </div>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-secondary">
                    {area.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="md:hidden">
          <FlowChain items={["CONTENT", "STREAM SETUP", "PRESENTATION", "COMMUNITY", "WORKFLOW"]} />
        </div>
      </div>
    </section>
  );
}

/* ---------- growth system architecture ---------- */

export function GrowthSystemSection() {
  const layers = ["STREAM", "SYSTEM", "WORKFLOW", "CONTENT", "COMMUNITY"];
  const labels = ["STREAM SETUP", "CHANNEL", "CONTENT", "COMMUNITY", "WORKFLOW"];
  return (
    <section className="border-b border-border bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHead
          eyebrow="STREAMING SYSTEMS"
          title={<>STREAMING GROWTH STARTS WITH THE SYSTEM BEHIND THE STREAM.</>}
          lead="A stronger creator operation is rarely one feature. It is the combination of a reliable setup, clear presentation, repeatable workflows and a community experience that makes it easier to keep creating."
          align="center"
        />
        <Reveal className="mt-14" delay={100}>
          <div className="mx-auto max-w-md">
            <div className="rounded-xl border border-border bg-surface p-6">
              <p className="text-center text-[10px] uppercase tracking-[0.18em] text-dim">
                Technical architecture — conceptual
              </p>
              <ol className="mt-5 space-y-0">
                {layers.map((layer, i) => (
                  <li key={layer}>
                    <div className="flex items-center justify-between rounded-lg border border-border bg-surface-raised px-4 py-3">
                      <span className="font-display text-sm font-semibold tracking-[0.12em] text-foreground">
                        {layer}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.12em] text-dim">
                        {labels[i]}
                      </span>
                    </div>
                    {i < layers.length - 1 && (
                      <div className="flex justify-center py-1" aria-hidden="true">
                        <ArrowDown className="h-4 w-4 text-purple-bright" />
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- services ---------- */

function ServiceVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface p-4">
        <p className="text-[9px] uppercase tracking-[0.16em] text-dim">MINI AUDIT REPORT</p>
        {["CHANNEL", "PRESENTATION", "STREAM SETUP"].map((c, i) => (
          <div key={c} className="mt-2.5 flex items-center justify-between">
            <span className="text-[11px] text-secondary">{c}</span>
            <div className="h-1 w-24 overflow-hidden rounded bg-border">
              <div
                className={`h-full rounded ${["w-full bg-green", "w-2/3 bg-purple-bright", "w-1/3 bg-purple-bright"][i]}`}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="rounded-lg border border-border bg-surface p-4">
        <p className="text-[9px] uppercase tracking-[0.16em] text-dim">SIGNAL CHAIN</p>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {["SOURCE", "SCENE", "AUDIO", "ALERTS", "LIVE OUTPUT"].map((s, i) => (
            <span key={s} className="flex items-center gap-1.5">
              <span className="rounded bg-surface-raised px-2 py-1 text-[10px] tracking-[0.08em] text-secondary">
                {s}
              </span>
              {i < 4 && <span className="text-purple-bright">→</span>}
            </span>
          ))}
        </div>
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className="rounded-lg border border-border bg-surface p-4">
        <p className="text-[9px] uppercase tracking-[0.16em] text-dim">IDENTITY + COMMUNITY</p>
        <div className="mt-3 space-y-1.5">
          {["CREATOR", "DISCORD", "COMMUNITY", "REPEAT EXPERIENCE"].map((s, i) => (
            <div key={s} className="flex items-center gap-2" style={{ paddingLeft: i * 12 }}>
              <span className="h-1.5 w-1.5 rounded-full bg-purple-bright" aria-hidden="true" />
              <span className="text-[11px] text-secondary">{s}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <p className="text-[9px] uppercase tracking-[0.16em] text-dim">DASHBOARD LAYERS</p>
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        {["WEBSITE", "ANALYTICS", "WORKFLOWS", "TOOLS", "PLATFORMS", "INTEGRATION"].map((s) => (
          <div
            key={s}
            className="rounded bg-surface-raised px-2 py-2 text-center text-[9px] tracking-[0.06em] text-secondary"
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ServicesSection() {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHead
          eyebrow="WHAT LYNXDEVOPS BUILDS"
          title={<>FROM CHANNEL DIAGNOSIS TO DEPLOYMENT.</>}
        />
        <div className="mt-14 space-y-14">
          {services.map((service, i) => (
            <Reveal key={service.number} delay={80}>
              <article
                className={`grid items-center gap-8 md:grid-cols-2 ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <span className="font-display text-4xl font-bold text-purple-bright/70">
                    {service.number}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-[0.04em] text-foreground">
                    {service.name}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-secondary">
                    {service.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {service.areas.map((area) => (
                      <span
                        key={area}
                        className="rounded border border-border px-2 py-1 text-[10px] tracking-[0.06em] text-dim"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-[10px] uppercase tracking-[0.14em] text-dim">
                    Project scope depends on the creator's setup and requirements.
                  </p>
                  <Link
                    to={service.to}
                    className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-purple-bright transition-opacity hover:opacity-80"
                  >
                    {service.cta}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
                <ServiceVisual index={i} />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- diagnostic conversion section ---------- */

export function DiagnosticSection() {
  return (
    <section className="border-b border-border bg-ink py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl border border-border bg-surface shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-secondary">
                Audit Report
              </span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-dim">
                SAMPLE DIAGNOSTIC VIEW
              </span>
            </div>
            <ul className="divide-y divide-border/70">
              {sampleDiagnostic.map((row) => (
                <li key={row.category} className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium tracking-[0.08em] text-foreground">
                      {row.category}
                    </span>
                    <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.12em] text-dim">
                      <StatusDot status={row.status} />
                      {row.status}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-dim">{row.note}</p>
                </li>
              ))}
            </ul>
            <div className="border-t border-border px-4 py-2.5 text-[9px] uppercase tracking-[0.18em] text-dim">
              Example report — findings shown are illustrative only
            </div>
          </div>
        </Reveal>
        <div>
          <SectionHead
            eyebrow="START WITH THE SIGNALS"
            title={<>SEE WHAT'S HOLDING YOUR CHANNEL BACK.</>}
            lead="A focused channel diagnostic that reviews the areas a new viewer, returning viewer and creator experience first."
          />
          <p className="mt-4 text-sm leading-relaxed text-secondary">
            Send your channel and get a focused review of the areas that matter most to your
            streaming setup and presentation.
          </p>
          <PrimaryCta className="mt-8" />
        </div>
      </div>
    </section>
  );
}

/* ---------- process ---------- */

export function ProcessSection() {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHead
          eyebrow="THE LYNXDEVOPS PROCESS"
          title={<>FROM FIRST SIGNAL TO FINISHED SYSTEM.</>}
        />
        <ol className="mt-14 grid gap-6 md:grid-cols-5 md:gap-4">
          {processSteps.map((step, i) => (
            <li key={step.number} className="relative">
              <div
                className="absolute -top-3 left-0 hidden h-0.5 w-full bg-gradient-to-r from-purple-bright/50 to-transparent md:block"
                aria-hidden="true"
                style={{ display: i === 4 ? "none" : undefined }}
              />
              <span className="font-display text-sm font-semibold text-purple-bright">
                {step.number}
              </span>
              <h3 className="mt-2 font-display text-base font-semibold tracking-[0.1em] text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-secondary">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- work / evidence ---------- */

export function WorkPreviewSection() {
  return (
    <section className="relative min-h-[500px] overflow-hidden border-b border-border py-20 md:min-h-[620px] md:py-28">
      <img
        src={bannerAsset.url}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-background/65" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-[340px] max-w-6xl items-end px-5 md:min-h-[400px] md:px-8">
        <div className="max-w-2xl border-l-2 border-purple-bright bg-background/80 p-6 backdrop-blur-sm md:p-8">
          <SectionHead
            eyebrow="SELECTED WORK"
            title={<>THE SYSTEM BEHIND THE STREAM.</>}
            lead="Creator systems, presentation and technical infrastructure brought together under one focused LYNXDEVOPS standard."
          />
          <div className="mt-7">
            <GhostCta to="/work">EXPLORE THE WORK</GhostCta>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- creator video ---------- */

export function CreatorVideoSection() {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[0.8fr_1.2fr] md:px-8">
        <div className="mx-auto w-full max-w-sm overflow-hidden rounded-lg border border-border bg-ink shadow-2xl shadow-background/50">
          <video
            className="aspect-[9/16] w-full object-cover"
            controls
            playsInline
            preload="metadata"
            poster={creatorVideoPosterAsset.url}
            aria-label="LYNXDEVOPS creator experience video"
          >
            <source src={creatorVideoAsset.url} type="video/mp4" />
            Your browser does not support embedded video.
          </video>
          <div className="border-t border-border px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-dim">
              Creator experience · 00:56
            </p>
          </div>
        </div>
        <div>
          <SectionHead
            eyebrow="REAL CREATOR EXPERIENCE"
            title={<>SEE THE WORK THROUGH A CREATOR'S EYES.</>}
            lead="A direct creator perspective on the experience of working with LYNXDEVOPS — presented in their own voice, without manufactured claims."
          />
          <p className="mt-6 border-l border-purple-bright pl-4 text-sm leading-relaxed text-secondary">
            Press play to hear the full creator experience. Captions and volume controls are available through the video player.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- metrics ---------- */

export function MetricsSection() {
  return (
    <section className="border-b border-border bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHead
          eyebrow="EVIDENCE OVER HYPE"
          title={<>SHOW THE WORK. THEN SHOW WHAT CHANGED.</>}
          lead="Numbers are only shown when they are verified. No invented percentages, viewer counts or follower gains — ever."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["CHANNELS AUDITED", "PROJECTS COMPLETED", "PLATFORMS SUPPORTED", "EXPERIENCE"].map(
            (label) => (
              <div
                key={label}
                className="rounded-xl border border-dashed border-border bg-surface px-5 py-8 text-center"
              >
                <p className="font-display text-sm tracking-[0.14em] text-dim">
                  VERIFIED RESULT
                  <br />
                  TO BE ADDED
                </p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-dim/70">
                  {label}
                </p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- founder ---------- */

export function FounderSection() {
  const setups = [
    { asset: setupOneAsset, alt: "Curved multi-monitor gaming and streaming setup with blue and pink lighting" },
    { asset: setupTwoAsset, alt: "Glass desk creator workstation overlooking a city skyline" },
    { asset: setupThreeAsset, alt: "Overhead view of an advanced multi-monitor streaming workstation" },
  ];

  return (
    <section className="border-b border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid items-end gap-10 md:grid-cols-[0.85fr_1.15fr]">
          <SectionHead
            eyebrow="STREAMING ENVIRONMENTS"
            title={<>THE SETUP IS PART OF THE SYSTEM.</>}
            lead="Purpose-built creator spaces show how hardware, lighting, monitoring and workflow can work together as one operating environment."
          />
          <p className="text-sm leading-relaxed text-secondary md:max-w-md md:justify-self-end">
            These reference setups highlight the level of structure LYNXDEVOPS considers when reviewing a creator's technical environment.
          </p>
        </div>
        <div className="mt-12 grid auto-rows-[260px] gap-3 sm:grid-cols-2 md:auto-rows-[310px] md:grid-cols-3">
          {setups.map(({ asset, alt }, index) => (
            <figure
              key={asset.url}
              className={`group relative overflow-hidden rounded-lg border border-border bg-surface ${index === 0 ? "sm:row-span-2 md:row-span-1" : ""}`}
            >
              <img
                src={asset.url}
                alt={alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/75 to-transparent px-4 pb-4 pt-12 text-[10px] uppercase tracking-[0.14em] text-foreground">
                Setup reference {String(index + 1).padStart(2, "0")}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-16 grid gap-10 border-t border-border pt-12 md:grid-cols-2">
          <SectionHead
            eyebrow="BEHIND THE BUILD"
            title={
              <>
                REAL SYSTEMS. REAL WORK.
                <br />
                REAL CREATOR PROBLEMS.
              </>
            }
            lead="LYNXDEVOPS approaches streaming as a system — combining technical execution, creator workflows and visual presentation to build setups that creators can actually operate."
          />
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-purple-bright">
            Founder / Developer
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {[
              "STREAMING SYSTEMS",
              "CHANNEL DIAGNOSTICS",
              "CREATOR WORKFLOWS",
              "TECHNICAL IMPLEMENTATION",
            ].map((cap) => (
              <li
                key={cap}
                className="flex items-center gap-2.5 text-[12px] font-medium tracking-[0.08em] text-secondary"
              >
                <span className="h-1 w-1 rounded-full bg-green" aria-hidden="true" />
                {cap}
              </li>
            ))}
          </ul>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-purple-bright">
              Founder / Developer
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {["STREAMING SYSTEMS", "CHANNEL DIAGNOSTICS", "CREATOR WORKFLOWS", "TECHNICAL IMPLEMENTATION"].map((cap) => (
                <li key={cap} className="flex items-center gap-2.5 text-[12px] font-medium tracking-[0.08em] text-secondary">
                  <span className="h-1 w-1 rounded-full bg-green" aria-hidden="true" />
                  {cap}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- testimonials ---------- */

export function TestimonialsSection() {
  const featured = testimonials.filter((t) => t.featured);
  const rest = testimonials.filter((t) => !t.featured);
  return (
    <section className="border-b border-border bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHead
          eyebrow="REAL CREATOR EXPERIENCES"
          title={<>TRUST IS BUILT THROUGH THE WORK.</>}
          lead="The best proof is seeing how creators experience the work. Explore feedback and project experiences from creators LYNXDEVOPS has worked with."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {featured.map((t) => (
            <figure
              key={t.creator}
              className="flex flex-col rounded-xl border border-border bg-surface p-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.14em] text-purple-bright">
                  {t.platform}
                </p>
                <span aria-hidden="true" className="text-[11px] tracking-[0.2em] text-green">
                  ★★★★★
                </span>
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-secondary">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <p className="text-[13px] font-semibold text-foreground">{t.creator}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-dim">
                  {t.category}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(0, 6).map((t) => (
            <figure
              key={t.creator}
              className="rounded-lg border border-border bg-surface/60 p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-semibold text-foreground">{t.creator}</p>
                <span aria-hidden="true" className="text-[10px] tracking-[0.18em] text-green/70">
                  ★★★★★
                </span>
              </div>
              <blockquote className="mt-2 text-[12px] leading-relaxed text-secondary">
                "{t.quote}"
              </blockquote>
              <p className="mt-3 text-[9px] uppercase tracking-[0.12em] text-dim">
                {t.platform} — {t.category}
              </p>
            </figure>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-10">
          <p className="text-center text-[10px] uppercase tracking-[0.2em] text-dim">
            CREATORS WE'VE WORKED WITH
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {creatorNames.map((name) => (
              <li
                key={name}
                className="font-display text-sm tracking-[0.1em] text-secondary/80"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- why ---------- */

export function WhySection() {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[0.8fr_1.2fr] md:px-8">
        <div className="md:sticky md:top-28 md:self-start">
          <SectionHead
            eyebrow="WHY LYNXDEVOPS"
            title={
              <>
                TECHNICAL WORK.
                <br />
                WITHOUT THE HYPE.
              </>
            }
          />
          <div className="mt-8 hidden flex-col items-start gap-2 md:flex" aria-hidden="true">
            {["REAL", "REVIEW", "BUILD", "REFINE"].map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                <span className="text-[11px] font-semibold tracking-[0.16em] text-purple-bright">
                  {s}
                </span>
                {i < 3 && <ArrowDown className="h-3 w-3 text-dim" />}
              </span>
            ))}
          </div>
        </div>
        <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {whyPillars.map((pillar) => (
            <li key={pillar.number} className="border-t border-border pt-5">
              <span className="font-display text-xs text-purple-bright">{pillar.number}</span>
              <h3 className="mt-1.5 text-[13px] font-semibold tracking-[0.1em] text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-secondary">{pillar.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- platforms ---------- */

export function PlatformSection() {
  return (
    <section className="border-b border-border bg-ink py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
        <p className="eyebrow">BUILT FOR YOUR STACK</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          WORKING AROUND THE TOOLS YOU ALREADY USE.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] text-secondary">
          LYNXDEVOPS works around the creator tools and platforms you already use.
        </p>
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {platforms.map((p) => (
            <li key={p}>
              <Chip>{p}</Chip>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[10px] uppercase tracking-[0.14em] text-dim/70">
          No endorsement or official partnership implied
        </p>
      </div>
    </section>
  );
}

/* ---------- community ---------- */

export function CommunitySection() {
  return (
    <section className="border-b border-border py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-xl border border-border bg-surface p-8 md:flex-row md:items-center">
          <div>
            <p className="eyebrow">CREATOR SUPPORT</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-foreground">
              BUILD BETTER. LEARN TOGETHER.
            </h2>
            <p className="mt-2 max-w-lg text-sm text-secondary">
              A place for creators to share setups, workflows, ideas and experiences around the
              systems behind streaming.
            </p>
          </div>
           <div className="flex w-full flex-col gap-3 md:w-auto">
             <a
               href="https://discord.gg/KSNnDyzwU"
               target="_blank"
               rel="noreferrer"
               className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:border-purple-bright"
            >
               <MessageCircle className="h-4 w-4" aria-hidden="true" />
              JOIN THE LYNXDEVOPS COMMUNITY
             </a>
            <Link
              to="/diagnostic"
              className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-purple-bright transition-opacity hover:opacity-80"
            >
              GET MY FREE DIAGNOSTIC
            </Link>
             <a href="mailto:LYNXDEVOPS1@GMAIL.COM" className="inline-flex items-center justify-center gap-2 text-center text-[10px] uppercase tracking-[0.12em] text-dim transition-colors hover:text-foreground">
               <Mail className="h-3.5 w-3.5" aria-hidden="true" />
               LYNXDEVOPS1@GMAIL.COM
             </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

export function FaqAccordion({ items = faqs }: { items?: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border rounded-xl border border-border bg-surface">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium text-foreground">{item.q}</span>
              <span
                className={`text-purple-bright transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-secondary">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FaqSection() {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <SectionHead
          eyebrow="FAQ"
          title={<>CLEAR ANSWERS BEFORE YOU SEND YOUR CHANNEL.</>}
          align="center"
        />
        <div className="mt-12">
          <FaqAccordion />
        </div>
      </div>
    </section>
  );
}

/* ---------- final CTA ---------- */

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div className="absolute inset-0 radial-glow" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
        <h2 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-5xl">
          SEND YOUR CHANNEL.
          <br />
          START WITH THE DIAGNOSIS.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-[15px] text-secondary">
          Send your channel. Tell us what feels off. We'll start with the signals that matter.
        </p>
        <PrimaryCta className="mt-8" />
        <p className="mt-5 text-[11px] tracking-[0.06em] text-dim">
          Twitch &bull; KICK &bull; YouTube — No bots &bull; No fake engagement
        </p>
      </div>
    </section>
  );
}
