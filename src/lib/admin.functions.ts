import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

async function assertAdmin(userId: string, supabase: ReturnType<typeof getSupabase>) {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error || !data) {
    throw new Response("Forbidden", { status: 403 });
  }
}

// Helper type only — the real client comes from the auth middleware context.
declare function getSupabase(): import("@supabase/supabase-js").SupabaseClient;

export const getAuditRequests = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId, context.supabase);

    const { data, error } = await context.supabase
      .from("audit_requests")
      .select(
        "id, created_at, platform, channel_url, contact_type, contact_value, challenge, message, status, notes"
      )
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) throw error;
    return data;
  });

const updateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "reviewing", "contacted", "completed", "archived"]),
  notes: z.string().max(5000).optional().or(z.literal("")),
});

export const updateAuditRequest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => updateSchema.parse(data))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId, context.supabase);

    const { error } = await context.supabase
      .from("audit_requests")
      .update({
        status: data.status,
        notes: data.notes || null,
      })
      .eq("id", data.id);

    if (error) throw error;
    return { ok: true };
  });
