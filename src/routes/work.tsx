import { createFileRoute } from "@tanstack/react-router";
import { workTypes } from "@/lib/content";
import { FinalCtaSection, SectionHeadWrapper } from "@/components/pages";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work | LYNXDEVOPS" },
      {
        name: "description",
        content:
          "LYNXDEVOPS case studies are published when the evidence is real — stream systems, channel optimization, brand systems and creator infrastructure work.",
      },
      { property: "og:title", content: "Work | LYNXDEVOPS" },
      {
        property: "og:description",
        content:
          "Case studies published when the evidence is real. Stream systems, channel optimization, brand systems and creator infrastructure.",
      },
      { property: "og:type", content: "website" },
it      },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <>
      <section className="border-b border-border py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="eyebrow">SELECTED WORK</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            PROJECTS ARE PUBLISHED WHEN THE EVIDENCE IS REAL.
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-secondary">
            This page exists for real project breakdowns. Every published case study documents the
            challenge, what LYNXDEVOPS built and — only where verified — what changed.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="flex aspect-video max-w-4xl items-center justify-center rounded-xl border border-dashed border-border bg-surface">
            <p className="px-6 text-center text-[11px] uppercase tracking-[0.18em] text-dim">
              REAL PROJECT MEDIA TO BE ADDED
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">
                What a published project includes
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-secondary">
                {[
                  "Creator name and platform",
                  "Project type and challenge",
                  "What LYNXDEVOPS built",
                  "Optional verified result",
                  "Optional media and channel link",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="h-1 w-1 rounded-full bg-green" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">
                Project types
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {workTypes.map((type) => (
                  <span
                    key={type}
                    className="rounded border border-border bg-surface px-3 py-1.5 text-[11px] uppercase tracking-[0.1em] text-secondary"
                  >
                    {type}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm text-dim">
                PROJECT DETAILS AVAILABLE ON REQUEST
              </p>
            </div>
          </div>
        </div>
      </section>

      <FinalCtaSection />
    </>
  );
}
