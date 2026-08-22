type BrandLogoProps = {
  name: string;
  domain: string;
  className?: string;
};

export function BrandLogo({ name, domain, className = "" }: BrandLogoProps) {
  return (
    <div
      className={`group flex items-center justify-center rounded-md border border-border bg-background px-3 py-2 transition hover:border-foreground/20 hover:bg-background ${className}`}
      title={name}
    >
      <img
        src={`https://logo.clearbit.com/${domain}`}
        alt={`${name} logo`}
        loading="lazy"
        className="h-5 w-auto max-w-[88px] object-contain grayscale opacity-60 transition duration-300 group-hover:grayscale-0 group-hover:opacity-100"
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = "none";
          const fallback = target.nextElementSibling as HTMLElement | null;
          if (fallback) fallback.style.display = "block";
        }}
      />
      <span className="hidden font-mono text-[12px] tracking-tight">{name}</span>
    </div>
  );
}
