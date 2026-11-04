import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { queryOptions, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Loader2, Save, UserRound, KeyRound, LogOut, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { LanguageProvider, useI18n } from "@/i18n/LanguageProvider";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { LicenseList } from "@/components/account/LicenseList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { getMyProfile, saveMyProfile } from "@/utils/profile.functions";

const profileOptions = (userId: string) => queryOptions({
  queryKey: ["my-profile", userId],
  queryFn: () => getMyProfile(),
});

export const Route = createFileRoute("/_authenticated/account")({
  loader: ({ context }) => context.queryClient.ensureQueryData(profileOptions(context.user.id)),
  head: () => ({
    meta: [
      { title: "User Profile | RobotAI Pose6D" },
      { name: "description", content: "Manage your personal information and Pose6D licenses." },
      { property: "og:title", content: "User Profile | RobotAI Pose6D" },
      { property: "og:description", content: "Manage your personal information and Pose6D licenses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LanguageProvider>
      <AccountPage />
    </LanguageProvider>
  ),
});

function AccountPage() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { lang } = useI18n();
  const zh = lang === "zh";
  const { data: profile } = useSuspenseQuery(profileOptions(user.id));
  const saveProfile = useServerFn(saveMyProfile);
  const [fields, setFields] = useState(profile);
  const [saving, setSaving] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const changed = fields.full_name !== profile.full_name || fields.company !== profile.company || fields.phone !== profile.phone;

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const saved = await saveProfile({ data: fields });
      qc.setQueryData(profileOptions(user.id).queryKey, saved);
      setFields(saved);
      toast.success(zh ? "个人资料已保存" : "Profile saved");
    } catch {
      toast.error(zh ? "无法保存个人资料，请重试。" : "Could not save your profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const signOut = async () => {
    setSigningOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      await qc.cancelQueries();
      qc.clear();
      await navigate({ to: "/auth", replace: true });
    } catch {
      toast.error(zh ? "无法退出登录，请重试。" : "Could not sign out. Please try again.");
      setSigningOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar hashBase="/" solid section="account" />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <span className="mono-label text-primary">{zh ? "账户" : "Account"}</span>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold">{zh ? "个人资料" : "User Profile"}</h1>
          <Button variant="outline" onClick={signOut} disabled={signingOut}>
            {signingOut ? <Loader2 className="animate-spin" /> : <LogOut />}
            {zh ? "退出登录" : "Sign out"}
          </Button>
        </div>
        <p className="mt-2 break-all text-sm text-muted-foreground">{user.email}</p>

        <Tabs defaultValue="personal" className="mt-8">
          <TabsList className="gap-2">
            <TabsTrigger value="personal" className="gap-2"><UserRound className="h-4 w-4" />{zh ? "个人信息" : "Personal information"}</TabsTrigger>
            <TabsTrigger value="licenses" className="gap-2"><KeyRound className="h-4 w-4" />{zh ? "许可证" : "Licenses"}</TabsTrigger>
          </TabsList>
          <TabsContent value="personal" className="mt-8 border-t border-border pt-8">
            <form onSubmit={save} className="space-y-6">
              <h2 className="text-lg font-semibold">{zh ? "个人信息" : "Personal information"}</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="profile-name" className="text-sm font-medium">{zh ? "姓名" : "Full name"}</label>
                  <Input id="profile-name" autoComplete="name" maxLength={120} value={fields.full_name} disabled={saving} onChange={e => setFields({ ...fields, full_name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="profile-company" className="text-sm font-medium">{zh ? "公司" : "Company"}</label>
                  <Input id="profile-company" autoComplete="organization" maxLength={160} value={fields.company} disabled={saving} onChange={e => setFields({ ...fields, company: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="profile-phone" className="text-sm font-medium">{zh ? "电话号码" : "Phone"}</label>
                  <Input id="profile-phone" type="tel" autoComplete="tel" maxLength={40} value={fields.phone} disabled={saving} onChange={e => setFields({ ...fields, phone: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="profile-email" className="text-sm font-medium">{zh ? "账户邮箱" : "Account email"}</label>
                  <Input id="profile-email" type="email" value={user.email ?? ""} readOnly className="bg-muted text-muted-foreground" />
                </div>
              </div>
              <Button type="submit" disabled={saving || !changed}>
                {saving ? <Loader2 className="animate-spin" /> : <Save />}
                {saving ? (zh ? "保存中…" : "Saving…") : (zh ? "保存更改" : "Save changes")}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="licenses" className="mt-8 border-t border-border pt-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">{zh ? "您的许可证" : "Your licenses"}</h2>
              <Button asChild variant="outline"><Link to="/pricing">{zh ? "获取许可证" : "Get a license"}<ArrowRight /></Link></Button>
            </div>
            <LicenseList />
          </TabsContent>
        </Tabs>
      </main>
      <Footer hashBase="/" />
    </div>
  );
}
