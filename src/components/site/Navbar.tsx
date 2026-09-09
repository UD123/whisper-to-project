import { Link } from "@tanstack/react-router";
import { LogoMark } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useT } from "@/i18n/LanguageProvider";

/** `hashBase` is "/" on sub-pages so in-page anchors point back to the landing page. */
export function Navbar({
  hashBase = "",
  solid = false,
  section = "product",
}: {
  hashBase?: string;
  solid?: boolean;
  section?: "product" | "docs";
}) {
  const t = useT();

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border ${
        solid ? "bg-background" : "bg-background/80 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href={`${hashBase}#top`} className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-[17px] font-semibold tracking-tight">
            <LogoMark className="h-5 w-5 text-primary" />
            RobotAI
          </span>
          <span className="hidden items-center gap-1.5 rounded-full border border-border bg-card px-2 py-1 sm:inline-flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
            </span>
            <span className="mono-label text-muted-foreground">{t.nav.live}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 xl:flex">
          {t.nav.links.map((l) => (
            <a
              key={l.href}
              href={`${hashBase}${l.href}`}
              className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-border bg-card p-1">
            <Link
              to="/"
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                section === "product"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.nav.product}
            </Link>
            <Link
              to="/guide"
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                section === "docs"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.nav.docs}
            </Link>
          </div>

          <LanguageSwitcher />

        </div>
      </div>
    </header>
  );
}
