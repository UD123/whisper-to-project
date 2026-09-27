import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { LogoMark } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useT } from "@/i18n/LanguageProvider";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

type Section = "product" | "docs" | "download" | "pricing";

/** `hashBase` is "/" on sub-pages so in-page anchors point back to the landing page. */
export function Navbar({
  hashBase = "",
  solid = false,
  section = "product",
}: {
  hashBase?: string;
  solid?: boolean;
  section?: Section;
}) {
  const t = useT();
  const [open, setOpen] = useState(false);

  const tabs: { to: "/" | "/guide" | "/download" | "/pricing"; key: Section; label: string }[] = [
    { to: "/", key: "product", label: t.nav.product },
    { to: "/guide", key: "docs", label: t.nav.docs },
    { to: "/download", key: "download", label: t.nav.download },
    { to: "/pricing", key: "pricing", label: t.nav.pricing },
  ];

  const tabClass = (active: boolean) =>
    `whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
      active ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border ${
        solid ? "bg-background" : "bg-background/80 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href={`${hashBase}#top`} className="flex min-w-0 items-center gap-3">
          <span className="flex shrink-0 items-center gap-2 whitespace-nowrap text-[17px] font-semibold tracking-tight">
            <LogoMark className="h-5 w-5 text-primary" />
            RobotAI
          </span>
          <span className="hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-card px-2 py-1 md:inline-flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
            </span>
            <span className="mono-label text-muted-foreground">{t.nav.live}</span>
          </span>
        </a>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center rounded-lg border border-border bg-card p-1 sm:flex">
            {tabs.map((tab) => (
              <Link key={tab.key} to={tab.to} className={tabClass(section === tab.key)}>
                {tab.label}
              </Link>
            ))}
          </div>

          <LanguageSwitcher />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card sm:hidden"
            >
              <Menu className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="text-base">RobotAI</SheetTitle>
              <div className="mt-6 flex flex-col gap-1">
                {tabs.map((tab) => (
                  <Link
                    key={tab.key}
                    to={tab.to}
                    onClick={() => setOpen(false)}
                    className={tabClass(section === tab.key)}
                  >
                    {tab.label}
                  </Link>
                ))}
              </div>
              {section === "product" && (
                <div className="mt-6 flex flex-col gap-1 border-t border-border pt-4">
                  {t.nav.links.map((l) => (
                    <a
                      key={l.href}
                      href={`${hashBase}${l.href}`}
                      onClick={() => setOpen(false)}
                      className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {section === "product" && (
        <div className="hidden border-t border-border sm:block">
          <nav className="mx-auto flex h-10 max-w-7xl items-center gap-5 overflow-x-auto px-6 [scrollbar-width:none]">
            {t.nav.links.map((l) => (
              <a
                key={l.href}
                href={`${hashBase}${l.href}`}
                className="shrink-0 whitespace-nowrap text-[13px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
