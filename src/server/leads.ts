import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const LeadSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(200),
  phone: z.string().max(50).optional().nullable(),
  company: z.string().max(200).optional().nullable(),
  sector: z.string().max(200).optional().nullable(),
  service: z.string().max(200).optional().nullable(),
  message: z.string().max(5000).optional().nullable(),
  source: z.enum(["contact", "audit", "checkout", "diagnostic"]).default("contact"),
  language: z.string().max(5).default("fr"),
  currency: z.string().max(5).default("EUR"),
  amount: z.number().nullable().optional(),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => LeadSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("leads").insert({
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      company: data.company ?? null,
      sector: data.sector ?? null,
      service: data.service ?? null,
      message: data.message ?? null,
      source: data.source,
      language: data.language,
      currency: data.currency,
      amount: data.amount ?? null,
    });
    if (error) {
      console.error("Lead insert error:", error);
      return { success: false, error: "Failed to save lead" };
    }
    return { success: true };
  });
