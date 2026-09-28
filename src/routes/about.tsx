import { createFileRoute } from "@tanstack/react-router";
import { FinalCtaSection } from "@/components/landing";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | LYNXDEVOPS" },
      {
        name: "description",
        content:
          "LYNXDEVOPS is a premium creator technology and streaming systems studio — real systems, real work, real creator problems.",
      },
      { property: "og:title", content: "About | LYNXDEVOPS" },
      {
        property: "og:description",
        content:
          "Real systems. Real work. Real creator problems. The studio behind your stream, engineered.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="border-b border-border py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="eyebrow">THE PERSON BEHIND THE SYSTEM</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            TECHNICAL THINKING. CREATOR-FIRST EXECUTION.
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-secondary">
            LYNXDEVOPS is built around the systems behind the stream — the setup, workflows,
            presentation and infrastructure that creators rely on every time they go live.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 md:grid-cols-2 md:px-8">
          <div className="flex aspect-[4/5] max-h-[460px] items-center justify-center rounded-xl border border-dashed border-border bg-surface">
            <p className="px-6 text-center text-[11px] uppercase tracking-[0.18em] text-dim">
              [FOUNDER PHOTO TO BE ADDED]
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">
              REAL SYSTEMS. REAL WORK. REAL CREATOR PROBLEMS.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-secondary">
              LYNXDEVOPS approaches streaming as a system — combining technical execution, creator
              workflows and visual presentation to build setups that creators can actually operate.
            </p>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-purple-bright">
              Founder / Developer / Streaming Systems Specialist
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
          </div>
        </div>
      </section>

      <FinalCtaSection />
    </>
  );
}
