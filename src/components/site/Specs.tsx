import { useT } from "@/i18n/LanguageProvider";

export function Specs() {
  const t = useT();

  return (
    <section id="specs" className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="mono-label text-primary">{t.specs.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            {t.specs.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.specs.subtitle}</p>
        </div>

        <div className="mt-12 overflow-hidden rounded-xl border border-border bg-background">
          <table className="w-full text-left">
            <tbody className="divide-y divide-border">
              {t.specs.rows.map(([k, v]) => (
                <tr key={k}>
                  <th className="mono-label w-1/3 bg-card px-6 py-4 text-muted-foreground">{k}</th>
                  <td className="px-6 py-4 text-sm text-foreground">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
