import { createFileRoute } from "@tanstack/react-router";
import { services } from "@/lib/content";
import { FinalCtaSection } from "@/components/landing";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | LYNXDEVOPS" },
      {
        name: "description",
        content:
          "Channel diagnostics, stream systems, brand + community systems and creator infrastructure for Twitch, KICK and YouTube creators.",
      },
      { property: "og:title", content: "Services | LYNXDEVOPS" },
      {
        property: "og:description",
        content:
          "From channel diagnosis to deployment: diagnostics, stream systems, brand + community and creator infrastructure.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="border-b border-border py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="eyebrow">WHAT LYNXDEVOPS BUILDS</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            FROM CHANNEL DIAGNOSIS TO DEPLOYMENT.
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-secondary">
            Four service categories cover the systems around your stream — from the first review of
            your channel to the infrastructure that keeps everything running.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl space-y-14 px-5 md:px-8">
          {services.map((service) => (
            <article
              key={service.number}
              className="grid gap-8 border-t border-border pt-10 md:grid-cols-[0.9fr_1.1fr]"
            >
              <div>
                <span className="font-display text-5xl font-bold text-purple-bright/60">
                  {service.number}
                </span>
                <h2 className="mt-4 font-display text-2xl font-semibold tracking-[0.04em] text-foreground">
                  {service.name}
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-secondary">
                  {service.description}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-dim">KEY AREAS</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {service.areas.map((area) => (
                    <span
                      key={area}
                      className="rounded border border-border px-2.5 py-1 text-[11px] tracking-[0.06em] text-secondary"
                    >
                      {area}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-[10px] uppercase tracking-[0.14em] text-dim">
                  Project scope depends on the creator's setup and requirements.
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FinalCtaSection />
    </>
  );
}
