const ROLES = [
  {
    name: 'OrbitWatch',
    sector: 'Stealth Defense AI & Geospatial Intelligence',
    meta: 'Consulting VP of Design · 2026',
    desc: ['Architected the ', 'zero-error tactical UI', ' for an autonomous gap-analysis engine, translating complex SAR telemetry into actionable physical truth.'],
  },
  {
    name: 'Cypherock',
    sector: 'Crypto Hardware Security',
    meta: 'Head of Design · 2022 – 2026',
    desc: ['Ran design as a company-level function from pre-launch to ', '$1.16M ARR', ', assuming total accountability for every customer-facing surface across hardware, desktop, and mobile.'],
  },
]

export default function TrackRecord() {
  return (
    <section className="wrap track reveal">
      <span className="eyebrow">Track record</span>
      <div className="tr-list">
        {ROLES.map((r) => (
          <article className="tile role" key={r.name}>
            <span className="eyebrow ink">{r.meta}</span>
            <h3 className="tr-org">
              <span className="tr-name">{r.name}</span>
              {r.sector}
            </h3>
            <p className="desc">
              {r.desc[0]}
              <strong>{r.desc[1]}</strong>
              {r.desc[2]}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
