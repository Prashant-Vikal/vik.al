import { useEffect, useState } from 'react'

/* ---- font registry (built-ins; CSV adds more via: font,Name,serif|sans|mono,URL) ---- */
const G = 'https://fonts.googleapis.com/css2?family='
const FONTS = {
  'Space Grotesk': { href: G + 'Space+Grotesk:wght@400;500;700&display=swap', stack: "'Space Grotesk', sans-serif", dw: '700', tk: '-0.02em' },
  'Bricolage Grotesque': { href: G + 'Bricolage+Grotesque:wght@400;600;700&display=swap', stack: "'Bricolage Grotesque', sans-serif", dw: '700', tk: '-0.02em' },
  'Familjen Grotesk': { href: G + 'Familjen+Grotesk:wght@400;500;700&display=swap', stack: "'Familjen Grotesk', sans-serif", dw: '700', tk: '-0.015em' },
  'Sora': { href: G + 'Sora:wght@400;600;700&display=swap', stack: "'Sora', sans-serif", dw: '700', tk: '-0.02em' },
  'Fraunces': { href: G + 'Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap', stack: "'Fraunces', serif", dw: '600', tk: '-0.012em' },
  'Instrument Serif': { href: G + 'Instrument+Serif:ital@0;1&display=swap', stack: "'Instrument Serif', serif", dw: '400', tk: '-0.01em' },
  'Newsreader': { href: G + 'Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap', stack: "'Newsreader', serif", dw: '500', tk: '-0.012em' },
  'Hanken Grotesk': { href: G + 'Hanken+Grotesk:wght@400;500&display=swap', stack: "'Hanken Grotesk', sans-serif", dw: '500', tk: '-0.015em' },
  'Inter': { href: G + 'Inter:wght@400;500;600&display=swap', stack: "'Inter', sans-serif", dw: '600', tk: '-0.02em' },
  'Figtree': { href: G + 'Figtree:wght@400;500;600&display=swap', stack: "'Figtree', sans-serif", dw: '600', tk: '-0.02em' },
  'IBM Plex Sans': { href: G + 'IBM+Plex+Sans:wght@400;500;600&display=swap', stack: "'IBM Plex Sans', sans-serif", dw: '600', tk: '-0.02em' },
  'JetBrains Mono': { href: G + 'JetBrains+Mono:wght@500&display=swap', stack: "'JetBrains Mono', ui-monospace, monospace", dw: '500', tk: '0' },
}
function registerFont(name, kind, url) {
  const fb = kind === 'serif' ? 'Georgia, serif' : kind === 'mono' ? 'ui-monospace, monospace' : 'system-ui, sans-serif'
  FONTS[name] = { href: url, stack: "'" + name + "', " + fb, dw: kind === 'serif' ? '500' : '600', tk: kind === 'serif' ? '-0.01em' : kind === 'mono' ? '0' : '-0.02em' }
}
const loaded = {}
function ensureFont(name) {
  const f = FONTS[name]; if (!f || loaded[name]) return
  loaded[name] = 1
  const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = f.href
  document.head.appendChild(l)
}

/* ---- CSV: font lines register fonts (URL may contain commas); theme rows carry colours + 3 fonts + 3 sizes ---- */
function parseCSV(text) {
  const lines = text.split(/\r?\n/).map((s) => s.trim()).filter((s) => s && s[0] !== '#')
  let allowed = Infinity
  let order = []
  const map = {}
  lines.forEach((line) => {
    const p = line.split(',').map((s) => s.trim())
    const key = p[0].toLowerCase()
    if (key === 'font') {
      let name = p[1], kind = (p[2] || '').toLowerCase(), start = 3
      if (kind !== 'serif' && kind !== 'sans' && kind !== 'mono') { kind = 'sans'; start = 2 }
      const url = p.slice(start).join(',')
      if (name && url) registerFont(name, kind, url)
      return
    }
    if (key === 'themes_allowed') { allowed = parseInt(p[1], 10) || Infinity; return }
    if (p.length >= 9) order.push(p)
  })
  order = order.slice(0, allowed)
  const names = []
  order.forEach((p) => {
    names.push(p[0])
    map[p[0]] = { bg: p[1], surface: p[2], ink: p[3], ink2: p[4], ink3: p[5], accent: p[6], display: p[7], body: p[8], muted: p[9] || 'JetBrains Mono', heading: p[10] || '80', bodySize: p[11] || '17', mutedSize: p[12] || '11' }
  })
  return { order: names, map }
}

const root = document.documentElement
const S = (k, v) => root.style.setProperty(k, v)
function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16)
  return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')'
}

const BLUEPRINT = { bg: '#F3F6F9', surface: '#FAFCFE', ink: '#15202E', ink2: '#47566A', ink3: '#8696A6', accent: '#2D5BD6' }

const COLOR_META = [
  { key: 'bg', label: 'Background', id: 'c-bg', hexId: 'h-bg' },
  { key: 'surface', label: 'Surface', id: 'c-surface', hexId: 'h-surface' },
  { key: 'ink', label: 'Text', id: 'c-ink', hexId: 'h-ink' },
  { key: 'ink2', label: 'Secondary text', id: 'c-ink2', hexId: 'h-ink2' },
  { key: 'ink3', label: 'Muted text', id: 'c-ink3', hexId: 'h-ink3' },
  { key: 'accent', label: 'Accent', id: 'c-accent', hexId: 'h-accent' },
]

const HEADING_SIZES = [56, 64, 72, 80, 88]
const BODY_SIZES = [15, 16, 17, 18, 20]
const MUTED_SIZES = [10, 11, 12, 13]

/* preset sizes plus whatever the CSV supplies, so any value is selectable */
function sizeOptions(presets, current) {
  const set = new Set(presets)
  set.add(Number(current))
  return [...set].sort((a, b) => a - b)
}

export default function ThemeBuilder({ open, onClose }) {
  const [fontNames, setFontNames] = useState(() => Object.keys(FONTS))
  const [themes, setThemes] = useState({ order: [], map: {} })
  const [colors, setColors] = useState(BLUEPRINT)
  const [displayFont, setDisplayFont] = useState('Space Grotesk')
  const [bodyFont, setBodyFont] = useState('Hanken Grotesk')
  const [mutedFont, setMutedFont] = useState('JetBrains Mono')
  const [headingSize, setHeadingSize] = useState(80)
  const [bodySize, setBodySize] = useState(17)
  const [mutedSize, setMutedSize] = useState(11)
  const [gridVal, setGridVal] = useState(5)

  function applyPreset(p) {
    setColors({ bg: p.bg, surface: p.surface, ink: p.ink, ink2: p.ink2, ink3: p.ink3, accent: p.accent })
    if (FONTS[p.display]) setDisplayFont(p.display)
    if (FONTS[p.body]) setBodyFont(p.body)
    if (FONTS[p.muted]) setMutedFont(p.muted)
    setHeadingSize(Number(p.heading))
    setBodySize(Number(p.bodySize))
    setMutedSize(Number(p.mutedSize))
  }

  /* fetch + parse CSV on startup: register fonts, build presets, apply default */
  useEffect(() => {
    let alive = true
    fetch('/presets.csv')
      .then((r) => r.text())
      .then((text) => {
        if (!alive) return
        const parsed = parseCSV(text)
        setFontNames(Object.keys(FONTS))
        setThemes(parsed)
        const def = parsed.order[0]
        if (def) applyPreset(parsed.map[def])
      })
      .catch(() => { /* keep the Blueprint default already in :root */ })
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* colours + derived hairlines/grid */
  useEffect(() => {
    const gridAlpha = (gridVal / 10) * 0.1
    S('--bg', colors.bg); S('--surface', colors.surface); S('--ink', colors.ink)
    S('--ink-2', colors.ink2); S('--ink-3', colors.ink3); S('--accent', colors.accent)
    S('--line', hexA(colors.ink, 0.16)); S('--line-strong', hexA(colors.ink, 0.3)); S('--grid', hexA(colors.ink, gridAlpha))
  }, [colors, gridVal])

  useEffect(() => {
    const f = FONTS[displayFont]; if (!f) return
    ensureFont(displayFont); S('--display', f.stack); S('--dw', f.dw); S('--dtrack', f.tk)
  }, [displayFont])

  useEffect(() => {
    const f = FONTS[bodyFont]; if (!f) return
    ensureFont(bodyFont); S('--sans', f.stack)
  }, [bodyFont])

  useEffect(() => {
    const f = FONTS[mutedFont]; if (!f) return
    ensureFont(mutedFont); S('--muted-font', f.stack)
  }, [mutedFont])

  useEffect(() => { S('--heading-size', headingSize + 'px') }, [headingSize])
  useEffect(() => { S('--body-size', bodySize + 'px') }, [bodySize])
  useEffect(() => { S('--muted-size', mutedSize + 'px') }, [mutedSize])

  function loadPreset(name) {
    const p = themes.map[name]; if (p) applyPreset(p)
  }
  function reset() {
    setGridVal(5)
    const def = themes.order[0]
    if (def) loadPreset(def)
    else applyPreset({ ...BLUEPRINT, display: 'Space Grotesk', body: 'Hanken Grotesk', muted: 'JetBrains Mono', heading: 80, bodySize: 17, mutedSize: 11 })
  }

  const fontOption = (n) => <option key={n} value={n}>{n}</option>

  return (
    <aside className={open ? 'cz open' : 'cz'} id="cz" aria-label="Theme builder" aria-hidden={open ? 'false' : 'true'}>
      <div className="cz-head">
        <h2>Customize</h2>
        <button className="x" id="cz-close" aria-label="Close" onClick={onClose}>✕</button>
      </div>
      <p className="cz-sub">Make it yours. Opens in the default for everyone.</p>

      <div className="cz-grp">
        <span className="cz-lbl">Presets</span>
        <div className="cz-presets" id="cz-presets">
          {themes.order.map((name) => (
            <button key={name} onClick={() => loadPreset(name)}>{name}</button>
          ))}
        </div>
      </div>

      <div className="cz-grp">
        <span className="cz-lbl">Colours</span>
        {COLOR_META.map((m) => (
          <div className="cz-row" key={m.key}>
            <label htmlFor={m.id}>{m.label}</label>
            <span className="ctl">
              <span className="hex" id={m.hexId}>{colors[m.key].toUpperCase()}</span>
              <input
                type="color"
                id={m.id}
                value={colors[m.key]}
                onChange={(e) => setColors((c) => ({ ...c, [m.key]: e.target.value }))}
              />
            </span>
          </div>
        ))}
      </div>

      <div className="cz-grp">
        <span className="cz-lbl">Type</span>
        <div className="cz-typerow">
          <label htmlFor="f-display">Headings</label>
          <div className="pair">
            <select className="cz-select font" id="f-display" aria-label="Heading font" value={displayFont} onChange={(e) => setDisplayFont(e.target.value)}>
              {fontNames.map(fontOption)}
            </select>
            <select className="cz-select size" id="s-display" aria-label="Heading size" value={headingSize} onChange={(e) => setHeadingSize(Number(e.target.value))}>
              {sizeOptions(HEADING_SIZES, headingSize).map((n) => <option key={n} value={n}>{n}px</option>)}
            </select>
          </div>
        </div>
        <div className="cz-typerow">
          <label htmlFor="f-body">Body</label>
          <div className="pair">
            <select className="cz-select font" id="f-body" aria-label="Body font" value={bodyFont} onChange={(e) => setBodyFont(e.target.value)}>
              {fontNames.map(fontOption)}
            </select>
            <select className="cz-select size" id="s-body" aria-label="Body size" value={bodySize} onChange={(e) => setBodySize(Number(e.target.value))}>
              {sizeOptions(BODY_SIZES, bodySize).map((n) => <option key={n} value={n}>{n}px</option>)}
            </select>
          </div>
        </div>
        <div className="cz-typerow">
          <label htmlFor="f-muted">Muted</label>
          <div className="pair">
            <select className="cz-select font" id="f-muted" aria-label="Muted font" value={mutedFont} onChange={(e) => setMutedFont(e.target.value)}>
              {fontNames.map(fontOption)}
            </select>
            <select className="cz-select size" id="s-muted" aria-label="Muted size" value={mutedSize} onChange={(e) => setMutedSize(Number(e.target.value))}>
              {sizeOptions(MUTED_SIZES, mutedSize).map((n) => <option key={n} value={n}>{n}px</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="cz-grp">
        <span className="cz-lbl">Grid intensity</span>
        <input type="range" className="cz-range" id="g-range" min="0" max="10" value={gridVal} onChange={(e) => setGridVal(Number(e.target.value))} />
      </div>

      <button className="cz-reset" id="cz-reset" onClick={reset}>Reset to default</button>
    </aside>
  )
}
