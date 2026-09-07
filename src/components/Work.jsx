import Scene from './Scene.jsx'
import { SCENES } from '../scenes/markup.js'

const byId = Object.fromEntries(SCENES.map((s) => [s.id, s]))

const PROJECTS = [
  {
    label: 'Methodology',
    name: 'VikSchema Studio',
    href: null,
    desc: 'A way to build design systems organized by responsibility, not complexity, so they scale without fragmenting as products and teams grow.',
    go: 'Framework',
    scene: byId['sc-layers'],
    feature: true,
  },
  {
    label: 'Decision quality',
    name: 'Throughline',
    desc: 'A hiring evaluation system that makes the reasoning behind every decision visible and keeps the final call human. It computes and recommends. It never auto-decides.',
    scene: byId['sc-flow'],
  },
  {
    label: 'Tooling',
    name: 'Handsoff',
    desc: 'A Figma plugin that generates component documentation from the components themselves, so a growing system stays trustworthy instead of drifting out of date.',
    scene: byId['sc-emit'],
  },
  {
    label: 'Enablement',
    name: 'VikSense',
    desc: "A custom GPT that converts a design organization's tacit knowledge into an automated onboarding and first-pass review agent. It eliminates the scaling bottleneck of expertise trapped in senior leaders' heads.",
    //desc: "A custom GPT that turns a design org's tacit knowledge into onboarding, tutorials, and first-pass design review that anyone on the team can use.",
    scene: byId['sc-converge'],
  },
  {
    label: 'Protocol',
    name: 'AI-Facilitated Design Review',
    href: null,
    desc: 'Design reviews fail because they run on opinion. A protocol that converts feedback into evidence, with AI as facilitator rather than judge.',
    go: 'In progress',
    scene: byId['sc-transform'],
  },
]

export default function Work() {
  return (
    <section className="wrap work">
      <div className="work-head reveal">
        <span className="eyebrow">Selected work</span>
        <span className="count">Five systems</span>
      </div>
      <div className="work-tiles">
        {PROJECTS.map((p) => (
          <article key={p.name} className={p.feature ? 'tile feature' : 'tile'}>
            <span className="eyebrow ink">{p.label}</span>
            <span className="name">{p.name}</span>
            <p className="desc">{p.desc}</p>
            {p.go ? <span className="go">{p.go}</span> : null}
            <figure className="tile-scene" aria-label={p.scene.ariaLabel}>
              <Scene id={p.scene.id} html={p.scene.html} />
              <span className="tag">{p.scene.tag}</span>
            </figure>
          </article>
        ))}
      </div>
    </section>
  )
}
