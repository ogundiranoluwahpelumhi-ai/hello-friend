import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const submissionSchema = z.object({
  platform: z.enum(["Twitch", "KICK", "YouTube"]),
  channelUrl: z.string().trim().min(3).max(300),
  contactType: z.enum(["Discord", "Email"]),
  contactValue: z.string().trim().min(3).max(200),
  challenge: z.string().trim().min(3).max(200),
  message: z.string().trim().max(3000).optional().or(z.literal("")),
  // Hidden anti-spam field: humans never fill this in.
  trap: z.string().max(0).optional().or(z.literal("")),
});

export type DiagnosticResult =
  | { ok: true }
  | { ok: false; error: string };

export const submitDiagnostic = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => submissionSchema.parse(data))
  .handler(async ({ data }): Promise<DiagnosticResult> => {
    // Anti-spam: the hidden "trap" field must stay empty.
    if (data.trap) {
      return { ok: false, error: "Submission could not be processed." };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Basic rate limiting: max 3 submissions per contact value per 10 minutes.
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { count, error: countError } = await supabaseAdmin
      .from("audit_requests")
      .select("id", { count: "exact", head: true })
      .eq("contact_value", data.contactValue)
      .gte("created_at", tenMinutesAgo);

    if (countError) {
      console.error("rate limit check failed", countError.message);
      return { ok: false, error: "Something went wrong. Please try again." };
    }
    if ((count ?? 0) >= 3) {
      return {
        ok: false,
        error: "Too many submissions from this contact right now. Try again later.",
      };
    }

    const { error } = await supabaseAdmin.from("audit_requests").insert({
      platform: data.platform,
      channel_url: data.channelUrl,
      contact_type: data.contactType,
      contact_value: data.contactValue,
      challenge: data.challenge,
      message: data.message || null,
      status: "new",
    });

    if (error) {
      console.error("diagnostic insert failed", error.message);
      return { ok: false, error: "Submission failed. Please try again." };
    }

    return { ok: true };
  });
