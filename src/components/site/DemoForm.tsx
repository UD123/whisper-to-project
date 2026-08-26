import { useState } from "react";
import { toast } from "sonner";

export function DemoForm() {
  const [sent, setSent] = useState(false);

  return (
    <section id="demo" className="border-b border-border bg-card">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <div className="rounded-xl border border-border bg-background p-8 md:p-10">
          <span className="mono-label text-primary">06 — Evaluation</span>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
            Test RobotAI with Your Manufacturing Parts
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Send us your part geometry and application. We return a pose-estimation evaluation on your
            own components.
          </p>

          <form
            className="mt-8 grid gap-5 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              toast.success("Request received", {
                description: "Our engineering team replies within one business day.",
              });
            }}
          >
            <Field label="Name" name="name" placeholder="Jane Kaplan" />
            <Field label="Work Email" name="email" type="email" placeholder="jane@factory.com" />
            <Field label="Company" name="company" placeholder="Precision Metal Works" />
            <label className="flex flex-col gap-2">
              <span className="mono-label text-muted-foreground">Application Type</span>
              <select
                name="application"
                required
                defaultValue=""
                className="h-11 rounded-md border border-border bg-card px-3 text-sm transition-colors duration-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              >
                <option value="" disabled>
                  Select application
                </option>
                <option>Bin Picking</option>
                <option>Machine Tending</option>
                <option>Assembly</option>
                <option>Other</option>
              </select>
            </label>

            <button
              type="submit"
              className="sm:col-span-2 rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background transition-all duration-200 hover:opacity-90 hover:shadow-[0_10px_28px_-12px_var(--foreground)]"
            >
              {sent ? "Request Sent ✓" : "Request Custom Evaluation"}
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
