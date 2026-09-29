import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/diagnostic")({
  head: () => ({
    meta: [
      { title: "Free Channel Diagnostic | LYNXDEVOPS" },
      {
        name: "description",
        content:
          "Send your Twitch, KICK or YouTube channel for a free LYNXDEVOPS technical diagnostic — stream systems, OBS setup, presentation and workflows reviewed.",
      },
      { property: "og:title", content: "Free Channel Diagnostic | LYNXDEVOPS" },
      {
        property: "og:description",
        content:
          "Get a free technical review of your channel — stream setup, OBS, presentation and workflows.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DiagnosticPage,
});

type Result = { state: "idle" | "success" } | { state: "error"; message: string };

function DiagnosticPage() {
  const [result, setResult] = useState<Result>({ state: "idle" });
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const form = event.currentTarget;
    const fd = new FormData(form);

    const { submitDiagnostic } = await import("@/lib/diagnostic.functions");
    try {
      const res = await submitDiagnostic({
        data: {
          platform: String(fd.get("platform") || ""),
          channelUrl: String(fd.get("channelUrl") || ""),
          contactType: String(fd.get("contactType") || ""),
          contactValue: String(fd.get("contactValue") || ""),
          challenge: String(fd.get("challenge") || ""),
          message: String(fd.get("message") || ""),
          trap: String(fd.get("trap") || ""),
        },
      });
      if (res.ok) {
        setResult({ state: "success" });
        form.reset();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setResult({ state: "error", message: res.error });
      }
    } catch {
      setResult({ state: "error", message: "Please check the fields and try again." });
    } finally {
      setPending(false);
    }
  }

  if (result.state === "success") {
    return (
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-5 text-center md:px-8">
          <div className="glow-purple mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-green/60">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-green" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mt-8 font-display text-3xl font-semibold text-foreground sm:text-4xl">
            REQUEST RECEIVED.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-secondary">
            Your channel is in the review queue. LYNXDEVOPS will reach out using the contact
            method you provided — usually within 24–48 hours.
          </p>
          <p className="mt-6 text-[11px] uppercase tracking-[0.14em] text-dim">
            YOUR STREAM, ENGINEERED.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="border-b border-border py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="eyebrow">FREE CHANNEL DIAGNOSTIC</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            TELL LYNXDEVOPS ABOUT YOUR CHANNEL.
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-secondary">
            Share your channel and your biggest challenge. A real technical review follows —
            no video call needed to start, and LYNXDEVOPS never asks for passwords, stream keys
            or account access.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-5 md:px-8">
          <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-surface p-6 md:p-8" noValidate={false}>
            {result.state === "error" && (
              <div role="alert" className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {result.message}
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="platform" className="text-[11px] font-semibold uppercase tracking-[0.12em] text-secondary">
                  Platform <span className="text-purple-bright" aria-hidden="true">*</span>
                </label>
                <select
                  id="platform"
                  name="platform"
                  required
                  defaultValue="Twitch"
                  className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-purple-bright focus:outline-none"
                >
                  <option value="Twitch">Twitch</option>
                  <option value="KICK">KICK</option>
                  <option value="YouTube">YouTube</option>
                </select>
              </div>
              <div>
                <label htmlFor="channelUrl" className="text-[11px] font-semibold uppercase tracking-[0.12em] text-secondary">
                  Channel URL <span className="text-purple-bright" aria-hidden="true">*</span>
                </label>
                <input
                  id="channelUrl"
                  name="channelUrl"
                  type="text"
                  required
                  maxLength={300}
                  placeholder="twitch.tv/yourname"
                  className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-dim focus:border-purple-bright focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="contactType" className="text-[11px] font-semibold uppercase tracking-[0.12em] text-secondary">
                  Preferred contact <span className="text-purple-bright" aria-hidden="true">*</span>
                </label>
                <select
                  id="contactType"
                  name="contactType"
                  required
                  defaultValue="Discord"
                  className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-purple-bright focus:outline-none"
                >
                  <option value="Discord">Discord</option>
                  <option value="Email">Email</option>
                </select>
              </div>
              <div>
                <label htmlFor="contactValue" className="text-[11px] font-semibold uppercase tracking-[0.12em] text-secondary">
                  {`${"Discord or email"}`} <span className="text-purple-bright" aria-hidden="true">*</span>
                </label>
                <input
                  id="contactValue"
                  name="contactValue"
                  type="text"
                  required
                  maxLength={200}
                  placeholder="yourname#0000 or you@email.com"
                  className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-dim focus:border-purple-bright focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="challenge" className="text-[11px] font-semibold uppercase tracking-[0.12em] text-secondary">
                Biggest challenge right now <span className="text-purple-bright" aria-hidden="true">*</span>
              </label>
              <input
                id="challenge"
                name="challenge"
                type="text"
                required
                maxLength={200}
                placeholder="e.g. Stream looks unprofessional, OBS drops frames, no system"
                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-dim focus:border-purple-bright focus:outline-none"
              />
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="text-[11px] font-semibold uppercase tracking-[0.12em] text-secondary">
                Anything else <span className="text-dim">(optional)</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                maxLength={3000}
                placeholder="Current setup, goals, what you've already tried…"
                className="mt-2 w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-dim focus:border-purple-bright focus:outline-none"
              />
            </div>

            {/* Honeypot — hidden from humans, bots fill it and get rejected */}
            <div className="absolute left-[-9999px]" aria-hidden="true">
              <label htmlFor="trap">Do not fill this field</label>
              <input id="trap" name="trap" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={pending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {pending ? "SENDING…" : "GET MY FREE CHANNEL DIAGNOSTIC"}
              </button>
            </div>
            <p className="mt-4 text-center text-xs text-dim">
              Stored securely. Never shared. No account access required.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
