import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  getAuditRequests,
  updateAuditRequest,
} from "@/lib/admin.functions";
import type { Database } from "@/integrations/supabase/types";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Studio Admin | LYNXDEVOPS" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type AuditRequest = Database["public"]["Tables"]["audit_requests"]["Row"];

const STATUS_OPTIONS = ["new", "reviewing", "contacted", "completed", "archived"] as const;

const STATUS_STYLES: Record<string, string> = {
  new: "border-purple-bright/50 text-purple-bright",
  reviewing: "border-amber-400/50 text-amber-300",
  contacted: "border-sky-400/50 text-sky-300",
  completed: "border-green/60 text-green",
  archived: "border-border text-dim",
};

function AdminPage() {
  const fetchRequests = useServerFn(getAuditRequests);
  const saveRequest = useServerFn(updateAuditRequest);
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const { data, isPending, isError } = useQuery({
    queryKey: ["audit-requests"],
    queryFn: fetchRequests,
    refetchInterval: 30_000,
  });

  const requests: AuditRequest[] = data ?? [];

  async function handleUpdate(
    id: string,
    status: string,
    notes: string
  ) {
    setError(null);
    try {
      await saveRequest({ data: { id, status: status as (typeof STATUS_OPTIONS)[number], notes } });
      await queryClient.invalidateQueries({ queryKey: ["audit-requests"] });
    } catch {
      setError("Update failed. Try again.");
    }
  }

  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="eyebrow">STUDIO ADMIN</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-foreground">
          DIAGNOSTIC REQUESTS
        </h1>
        <p className="mt-2 text-sm text-dim">
          {isPending
            ? "Loading…"
            : `${requests.length} submission${requests.length === 1 ? "" : "s"} · auto-refreshes every 30s`}
        </p>

        {error && (
          <div role="alert" className="mt-6 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {isError && (
          <div className="mt-8 rounded-xl border border-border bg-surface p-8 text-center text-sm text-secondary">
            Could not load requests. Refresh the page to retry.
          </div>
        )}

        {!isPending && requests.length === 0 && !isError && (
          <div className="mt-8 rounded-xl border border-dashed border-border bg-surface p-10 text-center text-sm text-dim">
            No diagnostic requests yet. Submissions from the website appear here.
          </div>
        )}

        <div className="mt-8 space-y-4">
          {requests.map((req) => (
            <RequestCard key={req.id} request={req} onSave={handleUpdate} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RequestCard({
  request,
  onSave,
}: {
  request: AuditRequest;
  onSave: (id: string, status: string, notes: string) => Promise<void>;
}) {
  const [status, setStatus] = useState(request.status);
  const [notes, setNotes] = useState(request.notes ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [open, setOpen] = useState(false);
  const dirty = status !== request.status || notes !== (request.notes ?? "");

  async function save() {
    setSaving(true);
    setSaved(false);
    await onSave(request.id, status, notes);
    setSaving(false);
    setSaved(true);
  }

  const created = request.created_at
    ? new Date(request.created_at).toLocaleString()
    : "—";

  return (
    <article className="rounded-xl border border-border bg-surface">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className={`rounded border px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] ${STATUS_STYLES[request.status] ?? ""}`}>
              {request.status}
            </span>
            <span className="text-[11px] uppercase tracking-[0.1em] text-purple-bright">
              {request.platform}
            </span>
            <span className="truncate text-sm font-medium text-foreground">
              {request.contact_value}
            </span>
          </div>
          <p className="mt-1 truncate text-xs text-dim">
            {created} · {request.challenge}
          </p>
        </div>
        <span className="shrink-0 text-xs text-dim">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="border-t border-border px-5 py-5">
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.12em] text-dim">Channel</dt>
              <dd className="mt-1 break-all text-foreground">{request.channel_url}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.12em] text-dim">Contact via</dt>
              <dd className="mt-1 text-foreground">{request.contact_type}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-[10px] uppercase tracking-[0.12em] text-dim">Challenge</dt>
              <dd className="mt-1 text-secondary">{request.challenge}</dd>
            </div>
            {request.message && (
              <div className="sm:col-span-2">
                <dt className="text-[10px] uppercase tracking-[0.12em] text-dim">Message</dt>
                <dd className="mt-1 whitespace-pre-wrap text-secondary">{request.message}</dd>
              </div>
            )}
          </dl>

          <div className="mt-5 grid gap-4 sm:grid-cols-[auto_1fr]">
            <div>
              <label htmlFor={`status-${request.id}`} className="text-[10px] font-semibold uppercase tracking-[0.12em] text-secondary">
                Status
              </label>
              <select
                id={`status-${request.id}`}
                value={status}
                onChange={(e) => setStatus(e.target.value as AuditRequest["status"])}
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-purple-bright focus:outline-none"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`notes-${request.id}`} className="text-[10px] font-semibold uppercase tracking-[0.12em] text-secondary">
                Private notes
              </label>
              <textarea
                id={`notes-${request.id}`}
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1.5 w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-purple-bright focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={save}
              disabled={saving || !dirty}
              className="btn-ghost px-4 py-2 text-[11px] disabled:opacity-40"
            >
              {saving ? "SAVING…" : "SAVE"}
            </button>
            {saved && !dirty && (
              <span className="text-xs text-green">Saved</span>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
