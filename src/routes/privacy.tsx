import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy | LYNXDEVOPS" },
      { name: "description", content: "How LYNXDEVOPS handles submitted channel information." },
      { property: "og:title", content: "Privacy | LYNXDEVOPS" },
      { property: "og:description", content: "How LYNXDEVOPS stores and protects channel diagnostic submissions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <p className="eyebrow">PRIVACY</p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-foreground">
          HOW YOUR INFORMATION IS HANDLED.
        </h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-secondary">
          <p>
            When you submit a channel diagnostic request, LYNXDEVOPS stores the information you
            provide — your platform, channel URL, preferred contact method, the challenge you're
            facing and any optional message — in a private, access-controlled database.
          </p>
          <p>
            Submissions are only visible to LYNXDEVOPS. They are never displayed publicly, shared
            with third parties, or used for marketing without permission.
          </p>
          <p>
            LYNXDEVOPS never asks for passwords, stream keys, OAuth credentials or other private
            account access. Any message requesting such information is not from LYNXDEVOPS.
          </p>
          <p>
            You can request removal of your submitted information at any time by contacting{" "}
            <a href="mailto:LYNXDEVOPS1@GMAIL.COM" className="text-foreground transition-colors hover:text-purple-bright">LYNXDEVOPS1@GMAIL.COM</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
