import { useEffect, useState } from "react";

type Item = { id: string; label: string };

export function GuideSidebar({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="sticky top-16 z-30 -mx-6 self-start bg-background px-6 py-3 lg:top-24 lg:mx-0 lg:px-0 lg:py-0">
      <span className="mono-label text-muted-foreground">Contents</span>
      <ul className="mt-2 flex gap-2 overflow-x-auto border-t border-border pt-3 lg:mt-4 lg:flex-col lg:gap-1 lg:overflow-visible lg:pt-4">
        {items.map((i) => (
          <li key={i.id} className="shrink-0">
            <a
              href={`#${i.id}`}
              className={`block rounded-md px-3 py-2 text-sm whitespace-nowrap transition-colors ${
                active === i.id
                  ? "bg-card font-medium text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
