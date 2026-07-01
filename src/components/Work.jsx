import Project from './Project.jsx'

const PROJECTS = [
  {
    label: 'Methodology',
    name: 'VikSchema Studio',
    href: null,
    desc: 'A way to build design systems organized by responsibility, not complexity, so they scale without fragmenting as products and teams grow.',
    go: 'Framework',
    graphic: 'layers',
    ariaLabel: 'Layered architecture, animated.',
    tag: 'responsibility layers',
    flip: false,
  },
  {
    label: 'Decision quality',
    name: 'Throughline',
    href: 'https://throughline.vikals.com',
    desc: 'A hiring evaluation system that makes the reasoning behind every decision visible and keeps the final call human. It computes and recommends. It never auto-decides.',
    graphic: 'flow',
    ariaLabel: 'Signal flowing to a human decision gate, animated.',
    tag: 'compute · then human',
    flip: true,
  },
  {
    label: 'Tooling',
    name: 'Handsoff',
    href: 'https://www.figma.com/community/plugin/1566768370192138452/handsoff-beta',
    desc: 'A Figma plugin that generates component documentation from the components themselves, so a growing system stays trustworthy instead of drifting out of date.',
    graphic: 'emit',
    ariaLabel: 'A component emitting its documentation, animated.',
    tag: 'component · to docs',
    flip: false,
  },
  {
    label: 'Enablement',
    name: 'VikSense',
    href: 'https://chatgpt.com/g/g-692dc948c7748191bf5670f0bfaad32f-viksense',
    desc: "A custom GPT that turns a design org's tacit knowledge into onboarding, tutorials, and first-pass design review that anyone on the team can use.",
    graphic: 'converge',
    ariaLabel: 'Scattered knowledge converging into three outputs, animated.',
    tag: 'knowledge · to outputs',
    flip: true,
  },
  {
    label: 'Protocol',
    name: 'AI-Facilitated Design Review',
    href: null,
    desc: 'Design reviews fail because they run on opinion. A protocol that converts feedback into evidence, with AI as facilitator rather than judge.',
    go: 'In progress',
    graphic: 'transform',
    ariaLabel: 'Opinion reordering into evidence through a facilitation plane, animated.',
    tag: 'opinion · to evidence',
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
