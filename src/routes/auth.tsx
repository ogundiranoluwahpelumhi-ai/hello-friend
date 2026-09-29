import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Studio Sign In | LYNXDEVOPS" },
      { name: "robots", content: "noindex" },
s    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setPending(false);
    if (authError) {
      setError("Sign in failed. Check your credentials.");
      return;
    }
    navigate({ to: "/admin" });
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center py-24">
      <div className="w-full max-w-md px-5 md:px-8">
        <div className="rounded-xl border border-border bg-surface p-8">
          <p className="eyebrow">STUDIO ACCESS</p>
          <h1 className="mt-3 font-display text-2xl font-semibold text-foreground">
            LYNXDEVOPS SIGN IN
          </h1>
          <p className="mt-2 text-sm text-dim">
            Private studio area. Accounts are provisioned by LYNXDEVOPS.
          </p>

          <form onSubmit={handleSignIn} className="mt-8 space-y-5">
            {error && (
              <div role="alert" className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-[0.12em] text-secondary">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-purple-bright focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-[11px] font-semibold uppercase tracking-[0.12em] text-secondary">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-purple-bright focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={pending}
              className="btn-primary w-full justify-center disabled:opacity-60"
            >
              {pending ? "SIGNING IN…" : "SIGN IN"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
