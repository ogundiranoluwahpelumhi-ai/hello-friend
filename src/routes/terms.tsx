import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms | LYNXDEVOPS" },
      { name: "description", content: "Terms of service for LYNXDEVOPS streaming systems studio." },
      { property: "og:title", content: "Terms | LYNXDEVOPS" },
      { property: "og:description", content: "The terms for LYNXDEVOPS channel diagnostics and creator systems services." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <p className="eyebrow">TERMS</p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-foreground">
          THE SHORT, HONEST VERSION.
        </h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-secondary">
          <p>
            LYNXDEVOPS provides technical channel diagnostics, streaming systems work, brand and
            community systems, and creator infrastructure services.
          </p>
          <p>
            LYNXDEVOPS does not sell viewers, followers or engagement, and does not guarantee
            channel growth, platform approval (Affiliate or Partner), retention or revenue.
            Platform outcomes depend on many variables outside anyone's control.
          </p>
          <p>
            The free channel diagnostic is a review of the areas you submit. Following the
            diagnostic, project scope depends on the creator's setup and requirements, and is
            agreed before any work begins.
          </p>
          <p>
            Testimonials shown on this site are creator experiences with LYNXDEVOPS work. They are
            not guarantees of results.
          </p>
          <p>
            Questions? Contact <a href="mailto:LYNXDEVOPS1@GMAIL.COM" className="text-foreground transition-colors hover:text-purple-bright">LYNXDEVOPS1@GMAIL.COM</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
