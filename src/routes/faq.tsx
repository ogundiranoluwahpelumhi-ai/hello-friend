import { createFileRoute } from "@tanstack/react-router";
import { faqs } from "@/lib/content";
import { FaqAccordion, FinalCtaSection } from "@/components/landing";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | LYNXDEVOPS" },
      {
        name: "description",
        content:
          "Clear answers about LYNXDEVOPS channel diagnostics, OBS setup help, Discord systems, branding and how the diagnostic process works.",
      },
      { property: "og:title", content: "FAQ | LYNXDEVOPS" },
      {
        property: "og:description",
        content:
          "Clear answers before you send your channel — what LYNXDEVOPS does, supports and doesn't offer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <section className="border-b border-border py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <p className="eyebrow">FAQ</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            CLEAR ANSWERS BEFORE YOU SEND YOUR CHANNEL.
          </h1>
        </div>
      </section>
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <FaqAccordion />
        </div>
      </section>
      <FinalCtaSection />
    </>
  );
}
