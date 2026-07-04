import { useEffect, useState } from 'react'

/* ---------- curated font maps (verbatim from reference) ---------- */
const DISPLAY = {
  'Space Grotesk': { css: 'family=Space+Grotesk:wght@500;700', dw: '700', tk: '-0.02em', stack: "'Space Grotesk', sans-serif" },
  'Bricolage Grotesque': { css: 'family=Bricolage+Grotesque:wght@400;600;700', dw: '700', tk: '-0.02em', stack: "'Bricolage Grotesque', sans-serif" },
  'Familjen Grotesk': { css: 'family=Familjen+Grotesk:wght@400;500;700', dw: '700', tk: '-0.015em', stack: "'Familjen Grotesk', sans-serif" },
  'Sora': { css: 'family=Sora:wght@400;600;700', dw: '700', tk: '-0.02em', stack: "'Sora', sans-serif" },
  'Fraunces': { css: 'family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600', dw: '600', tk: '-0.012em', stack: "'Fraunces', serif" },
  'Instrument Serif': { css: 'family=Instrument+Serif:ital@0;1', dw: '400', tk: '-0.01em', stack: "'Instrument Serif', serif" },
}
const BODY = {
  'Hanken Grotesk': { css: 'family=Hanken+Grotesk:wght@400;500', stack: "'Hanken Grotesk', sans-serif" },
  'Inter': { css: 'family=Inter:wght@400;500', stack: "'Inter', sans-serif" },
  'Figtree': { css: 'family=Figtree:wght@400;500', stack: "'Figtree', sans-serif" },
  'IBM Plex Sans': { css: 'family=IBM+Plex+Sans:wght@400;500', stack: "'IBM Plex Sans', sans-serif" },
}
const MUTED = {
  'JetBrains Mono': { css: 'family=JetBrains+Mono:wght@500', stack: "'JetBrains Mono', ui-monospace, monospace" },
  'Space Grotesk': { css: 'family=Space+Grotesk:wght@500;700', stack: "'Space Grotesk', sans-serif" },
  'Hanken Grotesk': { css: 'family=Hanken+Grotesk:wght@400;500', stack: "'Hanken Grotesk', sans-serif" },
  'Inter': { css: 'family=Inter:wght@400;500', stack: "'Inter', sans-serif" },
}

const loaded = {}
function ensureFont(css) {
  if (loaded[css]) return
  loaded[css] = 1
  const l = document.createElement('link')
  l.rel = 'stylesheet'
  l.href = 'https://fonts.googleapis.com/css2?' + css + '&display=swap'
  document.head.appendChild(l)
}

/* ---------- CSV parsing (ported verbatim from reference) ---------- */
function parseThemes(text) {
  const lines = text.split(/\r?\n/).map((s) => s.trim()).filter((s) => s && s[0] !== '#')
  let allowed = Infinity
  const order = []
  const map = {}
  lines.forEach((l) => {
    const p = l.split(',').map((s) => s.trim())
    if (p[0].toLowerCase() === 'themes_allowed') { allowed = parseInt(p[1], 10) || Infinity; return }
    if (p.length >= 9) order.push(p)
  })
  const rows = order.slice(0, allowed)
  const names = []
  rows.forEach((p) => { names.push(p[0]); map[p[0]] = { bg: p[1], surface: p[2], ink: p[3], ink2: p[4], ink3: p[5], accent: p[6], display: p[7], body: p[8] } })
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

export default function ThemeBuilder({ open, onClose }) {
  const [themes, setThemes] = useState({ order: [], map: {} })
  const [colors, setColors] = useState(BLUEPRINT)
  const [displayFont, setDisplayFont] = useState('Space Grotesk')
  const [bodyFont, setBodyFont] = useState('Hanken Grotesk')
  const [mutedFont, setMutedFont] = useState('JetBrains Mono')
  const [headingSize, setHeadingSize] = useState(80)
  const [bodySize, setBodySize] = useState(17)
  const [mutedSize, setMutedSize] = useState(11)
  const [gridVal, setGridVal] = useState(5)

  /* fetch + parse the CSV on startup; skip themes whose fonts are unmapped */
  useEffect(() => {
    let alive = true
    fetch('/presets.csv')
      .then((r) => r.text())
      .then((text) => {
        if (!alive) return
        const parsed = parseThemes(text)
        const valid = parsed.order.filter((name) => {
          const p = parsed.map[name]
          return DISPLAY[p.display] && BODY[p.body]
        })
        setThemes({ order: valid, map: parsed.map })
        const def = valid[0]
        if (def) applyPreset(parsed.map[def])
      })
      .catch(() => { /* keep the Blueprint default already in :root */ })
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* colours + derived hairlines/grid → repaint on any change */
  useEffect(() => {
    const gridAlpha = (gridVal / 10) * 0.1
    S('--bg', colors.bg); S('--surface', colors.surface); S('--ink', colors.ink)
    S('--ink-2', colors.ink2); S('--ink-3', colors.ink3); S('--accent', colors.accent)
    S('--line', hexA(colors.ink, 0.16)); S('--line-strong', hexA(colors.ink, 0.3)); S('--grid', hexA(colors.ink, gridAlpha))
  }, [colors, gridVal])

  useEffect(() => {
    const f = DISPLAY[displayFont]; if (!f) return
    ensureFont(f.css); S('--display', f.stack); S('--dw', f.dw); S('--dtrack', f.tk)
  }, [displayFont])

  useEffect(() => {
    const f = BODY[bodyFont]; if (!f) return
    ensureFont(f.css); S('--sans', f.stack)
  }, [bodyFont])

  useEffect(() => {
    const f = MUTED[mutedFont]; if (!f) return
    ensureFont(f.css); S('--muted-font', f.stack)
  }, [mutedFont])

  useEffect(() => { S('--heading-size', headingSize + 'px') }, [headingSize])
  useEffect(() => { S('--body-size', bodySize + 'px') }, [bodySize])
  useEffect(() => { S('--muted-size', mutedSize + 'px') }, [mutedSize])

  function applyPreset(p) {
    setColors({ bg: p.bg, surface: p.surface, ink: p.ink, ink2: p.ink2, ink3: p.ink3, accent: p.accent })
    setDisplayFont(p.display)
    setBodyFont(p.body)
  }
  function loadPreset(name) {
    const p = themes.map[name]; if (!p) return
    applyPreset(p)
  }
  function reset() {
    setGridVal(5); setHeadingSize(80); setBodySize(17); setMutedSize(11); setMutedFont('JetBrains Mono')
    const def = themes.order[0]
    if (def) loadPreset(def)
    else applyPreset(BLUEPRINT_FULL)
  }

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
              {Object.keys(DISPLAY).map((n) => <option key={n}>{n}</option>)}
            </select>
            <select className="cz-select size" id="s-display" aria-label="Heading size" value={headingSize} onChange={(e) => setHeadingSize(Number(e.target.value))}>
              {[56, 64, 72, 80, 88].map((n) => <option key={n} value={n}>{n}px</option>)}
            </select>
          </div>
        </div>
        <div className="cz-typerow">
          <label htmlFor="f-body">Body</label>
          <div className="pair">
            <select className="cz-select font" id="f-body" aria-label="Body font" value={bodyFont} onChange={(e) => setBodyFont(e.target.value)}>
              {Object.keys(BODY).map((n) => <option key={n}>{n}</option>)}
            </select>
            <select className="cz-select size" id="s-body" aria-label="Body size" value={bodySize} onChange={(e) => setBodySize(Number(e.target.value))}>
              {[15, 16, 17, 18, 20].map((n) => <option key={n} value={n}>{n}px</option>)}
            </select>
          </div>
        </div>
        <div className="cz-typerow">
          <label htmlFor="f-muted">Muted</label>
          <div className="pair">
            <select className="cz-select font" id="f-muted" aria-label="Muted font" value={mutedFont} onChange={(e) => setMutedFont(e.target.value)}>
              {Object.keys(MUTED).map((n) => <option key={n}>{n}</option>)}
            </select>
            <select className="cz-select size" id="s-muted" aria-label="Muted size" value={mutedSize} onChange={(e) => setMutedSize(Number(e.target.value))}>
              {[10, 11, 12, 13].map((n) => <option key={n} value={n}>{n}px</option>)}
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

const BLUEPRINT_FULL = { ...BLUEPRINT, display: 'Space Grotesk', body: 'Hanken Grotesk' }
