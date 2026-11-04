import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { profileSchema } from "@/lib/profile-schema";

export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.from("profiles")
      .select("full_name, company, phone").eq("user_id", context.userId).maybeSingle();
    if (error) throw new Error("Could not load your profile.");
    return data ?? { full_name: "", company: "", phone: "" };
  });

export const saveMyProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => profileSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { data: profile, error } = await context.supabase.from("profiles")
      .upsert({ ...data, user_id: context.userId, updated_at: new Date().toISOString() })
      .select("full_name, company, phone").single();
    if (error) throw new Error("Could not save your profile.");
    return profile;
  });