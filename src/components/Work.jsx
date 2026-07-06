import Project from './Project.jsx'
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
    flip: false,
  },
  {
    label: 'Decision quality',
    name: 'Throughline',
    href: 'https://throughline.vikals.com',
    desc: 'A hiring evaluation system that makes the reasoning behind every decision visible and keeps the final call human. It computes and recommends. It never auto-decides.',
    scene: byId['sc-flow'],
    flip: true,
  },
  {
    label: 'Tooling',
    name: 'Handsoff',
    href: 'https://www.figma.com/community/plugin/1566768370192138452/handsoff-beta',
    desc: 'A Figma plugin that generates component documentation from the components themselves, so a growing system stays trustworthy instead of drifting out of date.',
    scene: byId['sc-emit'],
    flip: false,
  },
  {
    label: 'Enablement',
    name: 'VikSense',
    href: 'https://chatgpt.com/g/g-692dc948c7748191bf5670f0bfaad32f-viksense',
    desc: "A custom GPT that turns a design org's tacit knowledge into onboarding, tutorials, and first-pass design review that anyone on the team can use.",
    scene: byId['sc-converge'],
    flip: true,
  },
  {
    label: 'Protocol',
    name: 'AI-Facilitated Design Review',
    href: null,
    desc: 'Design reviews fail because they run on opinion. A protocol that converts feedback into evidence, with AI as facilitator rather than judge.',
    go: 'In progress',
    scene: byId['sc-transform'],
    flip: false,
  },
]

export default function Work() {
  return (
    <section className="wrap">
      <div className="work-head reveal">
        <span className="eyebrow">Selected work</span>
        <span className="count">Five systems</span>
      </div>
      {PROJECTS.map((p) => (
        <Project key={p.name} {...p} />
      ))}
    </section>
  )
}
