import { createFileRoute } from "@tanstack/react-router";
import {
  Hero,
  TrustStrip,
  ProblemSection,
  GrowthSystemSection,
  ServicesSection,
  DiagnosticSection,
  ProcessSection,
  WorkPreviewSection,
  CreatorVideoSection,
  MetricsSection,
  FounderSection,
  TestimonialsSection,
  WhySection,
  PlatformSection,
  CommunitySection,
  FaqSection,
  FinalCtaSection,
} from "@/components/landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
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
          "Technical channel diagnostics, OBS optimization, creator systems and streaming infrastructure for Twitch, KICK and YouTube.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "LYNXDEVOPS — Your Stream, Engineered." },
      {
        name: "twitter:description",
        content:
          "Premium streaming systems studio for Twitch, KICK and YouTube creators.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "LYNXDEVOPS",
              description:
                "Premium technical creator-service studio focused on streaming systems, channel diagnostics and creator infrastructure for Twitch, KICK and YouTube.",
              slogan: "Your stream, engineered.",
            },
            {
              "@type": "WebSite",
              name: "LYNXDEVOPS",
              url: "/",
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ProblemSection />
      <GrowthSystemSection />
      <ServicesSection />
      <DiagnosticSection />
      <ProcessSection />
      <WorkPreviewSection />
      <CreatorVideoSection />
      <MetricsSection />
      <FounderSection />
      <TestimonialsSection />
      <WhySection />
      <PlatformSection />
      <CommunitySection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
