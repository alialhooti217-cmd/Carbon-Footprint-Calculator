const stats = [
  { label: "Tracked sources", value: "Fuel, electricity, process" },
  { label: "Calculation basis", value: "Auditable CO2e factors" },
  { label: "Target users", value: "Process and sustainability teams" },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 py-12">
      <section className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl bg-slateBlue p-10 text-white shadow-2xl">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-mint">
            Carbon Footprint Calculator
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight">
            Engineering-grade emissions intelligence for industrial operations.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-100">
            Build a traceable carbon inventory from plant activity data, compare
            emission sources, and uncover practical reduction opportunities.
          </p>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-lg backdrop-blur">
          <h2 className="text-xl font-semibold text-slate-800">MVP scope</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Fuel, electricity, and process activity capture</li>
            <li>CO2e calculation engine with factor traceability</li>
            <li>Dashboard summaries and trend charts</li>
            <li>Reduction recommendations and reporting</li>
          </ul>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-sm"
          >
            <p className="text-sm uppercase tracking-wide text-ember">
              {stat.label}
            </p>
            <p className="mt-3 text-xl font-medium text-slate-800">
              {stat.value}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
