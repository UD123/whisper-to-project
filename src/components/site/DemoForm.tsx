import { useState } from "react";
import { toast } from "sonner";
import { useT } from "@/i18n/LanguageProvider";

export function DemoForm() {
  const t = useT();
  const [sent, setSent] = useState(false);

  return (
    <section id="demo" className="border-b border-border bg-card">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <div className="rounded-xl border border-border bg-background p-8 md:p-10">
          <span className="mono-label text-primary">{t.demo.eyebrow}</span>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
            {t.demo.title}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">{t.demo.subtitle}</p>

          <form
            className="mt-8 grid gap-5 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              toast.success(t.demo.toastTitle, { description: t.demo.toastDesc });
            }}
          >
            <Field label={t.demo.name} name="name" placeholder={t.demo.namePlaceholder} />
            <Field
              label={t.demo.email}
              name="email"
              type="email"
              placeholder={t.demo.emailPlaceholder}
            />
            <Field label={t.demo.company} name="company" placeholder={t.demo.companyPlaceholder} />
            <label className="flex flex-col gap-2">
              <span className="mono-label text-muted-foreground">{t.demo.application}</span>
              <select
                name="application"
                required
                defaultValue=""
                className="h-11 rounded-md border border-border bg-card px-3 text-sm transition-colors duration-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              >
                <option value="" disabled>
                  {t.demo.applicationPlaceholder}
                </option>
                {t.demo.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              className="sm:col-span-2 rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background transition-all duration-200 hover:opacity-90 hover:shadow-[0_10px_28px_-12px_var(--foreground)]"
            >
              {sent ? t.demo.submitted : t.demo.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="mono-label text-muted-foreground">{label}</span>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="h-11 rounded-md border border-border bg-card px-3 text-sm transition-colors duration-200 outline-none placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15"
      />
    </label>
  );
}
