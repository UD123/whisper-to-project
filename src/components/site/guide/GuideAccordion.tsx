import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export function GuideAccordion({
  id,
  n,
  title,
  summary,
  open,
  onToggle,
  children,
}: {
  id: string;
  n?: string;
  title: string;
  summary?: string;
  open: boolean;
  onToggle: (id: string, next: boolean) => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      id={id}
      className="scroll-mt-24 border-b border-border first:border-t first:border-border"
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => onToggle(id, !open)}
        className="group flex w-full items-start gap-4 py-6 text-left"
      >
        {n ? <span className="mt-1 font-mono text-sm text-primary">{n}</span> : null}
        <span className="min-w-0 flex-1">
          <span className="block text-xl font-semibold tracking-[-0.02em] md:text-2xl">
            {title}
          </span>
          {summary ? (
            <span className="mt-1.5 block max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {summary}
            </span>
          ) : null}
        </span>
        <ChevronDown
          className={`mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={1.6}
        />
      </button>

      {open ? <div className="pb-12">{children}</div> : null}
    </section>
  );
}

/** Shared open/close state for a set of accordion sections, synced with the URL hash. */
export function useGuideAccordion(ids: string[], defaultOpen: string[]) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpen);

  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash || !ids.includes(hash)) return;
      setOpenIds((prev) => (prev.includes(hash) ? prev : [...prev, hash]));
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [ids]);

  const toggle = (id: string, next: boolean) =>
    setOpenIds((prev) => (next ? [...new Set([...prev, id])] : prev.filter((i) => i !== id)));

  return {
    openIds,
    toggle,
    isOpen: (id: string) => openIds.includes(id),
    expandAll: () => setOpenIds(ids),
    collapseAll: () => setOpenIds([]),
    allOpen: openIds.length === ids.length,
  };
}
