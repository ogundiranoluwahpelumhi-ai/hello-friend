// LYNXDEVOPS — site content. Single source for copy shown across pages.

export const BRAND = "LYNXDEVOPS";
export const TAGLINE = "YOUR STREAM, ENGINEERED.";

export const platforms = [
  "Twitch",
  "KICK",
  "YouTube",
  "OBS Studio",
  "StreamElements",
  "Streamer.bot",
  "Discord",
] as const;

export const problemAreas = [
  {
    number: "01",
    title: "STREAM SETUP",
    body: "OBS scenes, sources, audio, alerts, settings and workflow friction.",
    icon: "sliders",
  },
  {
    number: "02",
    title: "CHANNEL PRESENTATION",
    body: "Profile structure, panels, positioning, visual hierarchy and first-impression issues.",
    icon: "layout",
  },
  {
    number: "03",
    title: "COMMUNITY SYSTEMS",
    body: "Discord structure, roles, channels, moderation workflows and creator-community experience.",
    icon: "users",
  },
  {
    number: "04",
    title: "CONTENT + ANALYTICS",
    body: "VOD review, clips workflow, analytics visibility and repeatable content systems.",
    icon: "chart",
  },
] as const;

export const services = [
  {
    number: "01",
    name: "CHANNEL DIAGNOSTIC",
    description:
      "A focused review of the channel, presentation, content and technical setup to identify practical improvement opportunities.",
    areas: [
      "profile presentation",
      "channel structure",
      "stream setup",
      "content presentation",
      "discoverability",
      "community",
      "workflow",
    ],
    cta: "EXPLORE DIAGNOSTICS",
    to: "/diagnostic",
  },
  {
    number: "02",
    name: "STREAM SYSTEMS",
    description:
      "Technical setup and optimization across the systems creators use every time they go live.",
    areas: [
      "OBS",
      "scenes",
      "sources",
      "audio",
      "alerts",
      "StreamElements",
      "Streamer.bot",
      "workflows",
      "platform configuration",
    ],
    cta: "REQUEST PROJECT SCOPE",
    to: "/diagnostic",
  },
  {
    number: "03",
    name: "BRAND + COMMUNITY",
    description:
      "Build a more consistent creator experience across the stream and community.",
    areas: [
      "stream overlays",
      "panels",
      "alerts",
      "visual system",
      "Discord structure",
      "roles",
      "moderation workflows",
      "community experience",
    ],
    cta: "REQUEST PROJECT SCOPE",
    to: "/diagnostic",
  },
  {
    number: "04",
    name: "CREATOR INFRASTRUCTURE",
    description:
      "Technical infrastructure that helps creators operate more professionally across their content ecosystem.",
    areas: [
      "creator websites",
      "analytics dashboards",
      "automation",
      "content workflows",
      "multi-platform systems",
      "creator tools",
      "integration architecture",
    ],
    cta: "REQUEST PROJECT SCOPE",
    to: "/diagnostic",
  },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "SHARE",
    body: "Send your Twitch, KICK or YouTube channel and identify the area you want reviewed.",
  },
  {
    number: "02",
    title: "DIAGNOSE",
    body: "Review the channel, setup, presentation, content and relevant creator systems.",
  },
  {
    number: "03",
    title: "PRIORITIZE",
    body: "Identify the areas that matter most instead of changing everything at once.",
  },
  {
    number: "04",
    title: "BUILD",
    body: "Implement the relevant technical, branding, community or infrastructure improvements.",
  },
  {
    number: "05",
    title: "IMPROVE",
    body: "Refine the system based on what is learned and what the creator actually needs.",
  },
] as const;

export const whyPillars = [
  {
    number: "01",
    title: "REAL CHANNEL REVIEW",
    body: "We work from the creator's actual channel and setup.",
  },
  {
    number: "02",
    title: "CLEAR SCOPE",
    body: "You know what is being reviewed or built before work begins.",
  },
  {
    number: "03",
    title: "NO FAKE ENGAGEMENT",
    body: "No bots, fake viewers, fake followers or artificial activity.",
  },
  {
    number: "04",
    title: "CREATOR-FIRST SYSTEMS",
    body: "Solutions are built around how the creator actually works.",
  },
  {
    number: "05",
    title: "PLATFORM-AWARE",
    body: "Built around Twitch, KICK and YouTube environments.",
  },
  {
    number: "06",
    title: "HUMAN SUPPORT",
    body: "A real person reviews the work and communicates the next step.",
  },
] as const;

export type Testimonial = {
  creator: string;
  platform: string;
  category: string;
  quote: string;
  featured?: boolean;
};

// Owner-supplied draft testimonials. rating_verified = false until each
// creator confirms the wording. Never label these as verified reviews.
export const testimonials: Testimonial[] = [
  {
    creator: "GEOMAX01",
    platform: "Twitch + KICK",
    category: "STREAM SYSTEMS",
    quote:
      "LYNXDEVOPS helped me clean up my setup and improve how everything works together. My stream feels much more organized now.",
    featured: true,
  },
  {
    creator: "FAIDE",
    platform: "Twitch",
    category: "STREAM SYSTEMS",
    quote:
      "The work helped streamline the setup and presentation. Everything feels cleaner, more focused and easier to work with.",
    featured: true,
  },
  {
    creator: "Queen_RoseFire",
    platform: "Twitch",
    category: "CHANNEL PRESENTATION",
    quote:
      "The changes made my channel feel cleaner and more professional. Everything is easier to manage and present.",
    featured: true,
  },
  {
    creator: "Pizzaflyer24",
    platform: "Twitch",
    category: "CHANNEL OPTIMIZATION",
    quote:
      "LYNXDEVOPS helped me improve the overall look and setup of my channel. The difference is really noticeable.",
  },
  {
    creator: "Madtee3",
    platform: "Twitch",
    category: "STREAM SYSTEMS",
    quote:
      "The improvements made my stream setup much smoother. I now have a cleaner system that's easier to manage.",
  },
  {
    creator: "justAGC_",
    platform: "Twitch",
    category: "CHANNEL OPTIMIZATION",
    quote:
      "LYNXDEVOPS helped me tighten up my channel and presentation. The setup feels much more polished now.",
  },
  {
    creator: "Gamer_Chair_Adventures",
    platform: "Twitch",
    category: "BRAND + COMMUNITY",
    quote:
      "The changes gave my channel a much cleaner look and a more organized setup. It feels more put together now.",
  },
  {
    creator: "Sparqify_HQ",
    platform: "Twitch",
    category: "STREAM SYSTEMS",
    quote:
      "LYNXDEVOPS helped improve the way my stream is structured and presented. Everything feels more consistent now.",
  },
  {
    creator: "xface99x",
    platform: "Twitch",
    category: "STREAM SYSTEMS",
    quote:
      "The setup improvements made a real difference. My channel feels cleaner, smoother and more professional.",
  },
  {
    creator: "Nuttyd0mination",
    platform: "Twitch",
    category: "CHANNEL OPTIMIZATION",
    quote:
      "LYNXDEVOPS helped me improve the overall streaming setup and presentation. The changes made everything feel much more refined.",
  },
];

export const creatorNames = testimonials.map((t) => t.creator);

export const faqs = [
  {
    q: "Is LYNXDEVOPS a viewer or follower service?",
    a: "No. LYNXDEVOPS focuses on technical systems, channel presentation, creator workflows and related infrastructure. No fake engagement is offered.",
  },
  {
    q: "Can you guarantee that my channel will grow?",
    a: "No. Platform growth depends on many variables. The work focuses on controllable areas such as setup, presentation, systems, workflow and strategy.",
  },
  {
    q: "Do you work with Twitch, KICK and YouTube?",
    a: "Yes. LYNXDEVOPS is designed to support creators using Twitch, KICK and YouTube.",
  },
  {
    q: "Can you fix my OBS setup?",
    a: "Yes, depending on the issue. OBS scenes, sources, audio, settings, alerts and related workflow issues can be reviewed.",
  },
  {
    q: "Can you help with Discord?",
    a: "Yes. Community structure, roles, channels, moderation workflow and creator-community systems can be reviewed and built.",
  },
  {
    q: "Do you offer custom streamer branding?",
    a: "Yes. Brand systems can include overlays, panels, alerts, visual direction and related creator assets.",
  },
  {
    q: "Do I need a video call?",
    a: "No video call is required as the first step. The initial diagnostic can begin with a written channel submission.",
  },
  {
    q: "What happens after I submit my channel?",
    a: "LYNXDEVOPS reviews the submitted information and follows up with the appropriate next step.",
  },
] as const;

export const sampleDiagnostic = [
  { category: "CHANNEL", status: "REVIEWED", note: "Structure and positioning read clearly." },
  { category: "PRESENTATION", status: "NEEDS ATTENTION", note: "Panel hierarchy needs attention" },
  { category: "STREAM SETUP", status: "NEEDS ATTENTION", note: "Audio routing should be reviewed" },
  { category: "CONTENT", status: "OPPORTUNITY", note: "Content repurposing opportunity" },
  { category: "COMMUNITY", status: "OPPORTUNITY", note: "Brand system is inconsistent" },
  { category: "DISCOVERABILITY", status: "REVIEWED", note: "Baseline checks complete." },
] as const;

export const workTypes = [
  "Stream Systems",
  "Channel Optimization",
  "Brand Systems",
  "Discord / Community",
  "Creator Website",
  "Analytics / Infrastructure",
] as const;
