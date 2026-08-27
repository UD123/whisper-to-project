const specs = [
  ["Inference Speed", "Sub-30 ms (NVIDIA GPU accelerated)"],
  ["Output Data", "Direct 6DOF Vector (XYZ + RxRyRz)"],
  ["Camera Compatibility", "Standard RGB, Industrial Cameras (Basler, IDS, Balluff, RealSense, USB RGB)"],
  ["Supported Protocols", "TCP/IP, MODBUS, REST API, ROS, ROS2"],
  ["Robot Integration", "Universal Robots, Fanuc, Kuka, ABB, Yaskawa, and more."],
];

export function Specs() {
  return (
    <section id="specs" className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="mono-label text-primary">04 — Specifications</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            Technical Specifications
          </h2>
          <p className="mt-4 text-muted-foreground">
            Production-ready performance metrics for integration planning.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-xl border border-border bg-background">
          <table className="w-full text-left">
            <tbody className="divide-y divide-border">
              {specs.map(([k, v]) => (
                <tr key={k}>
                  <th className="mono-label w-1/3 bg-card px-6 py-4 text-muted-foreground">
                    {k}
                  </th>
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
