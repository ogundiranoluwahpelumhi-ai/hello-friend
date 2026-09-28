import { createFileRoute } from "@tanstack/react-router";
import { processSteps } from "@/lib/content";
import { FinalCtaSection } from "@/components/landing";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works | LYNXDEVOPS" },
      {
        name: "description",
        content:
          "The LYNXDEVOPS process: share your channel, get the diagnosis, prioritize, build and improve — from first signal to finished system.",
      },
      { property: "og:title", content: "How It Works | LYNXDEVOPS" },
      {
        property: "og:description",
        content:
          "Share, diagnose, prioritize, build, improve — the LYNXDEVOPS process from first signal to finished system.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
  return (
    <>
      <section className="border-b border-border py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="eyebrow">THE LYNXDEVOPS PROCESS</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            FROM FIRST SIGNAL TO FINISHED SYSTEM.
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-secondary">
            No video call required to start. The process begins with a written channel submission
            and moves at the pace your setup actually needs.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <ol className="space-y-0">
            {processSteps.map((step, i) => (
              <li key={step.number} className="relative flex gap-6 pb-10 last:pb-0">
                {i < processSteps.length - 1 && (
                  <span
                    className="absolute left-[19px] top-12 h-full w-px bg-border"
                    aria-hidden="true"
                  />
                )}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-purple-bright/50 bg-surface font-display text-xs font-semibold text-purple-bright">
                  {step.number}
                </span>
                <div className="pt-1.5">
                  <h2 className="font-display text-lg font-semibold tracking-[0.1em] text-foreground">
                    {step.title}
                  </h2>
                  <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-secondary">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FinalCtaSection />
    </>
  );
}
