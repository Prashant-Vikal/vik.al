import { useEffect, useState } from 'react'

/* ---------- curated font + preset maps (verbatim from reference) ---------- */
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
const PRESETS = {
  blueprint: { bg: '#F3F6F9', surface: '#FAFCFE', ink: '#15202E', ink2: '#47566A', ink3: '#8696A6', accent: '#2D5BD6', display: 'Space Grotesk', body: 'Hanken Grotesk' },
  graphite: { bg: '#F1F0ED', surface: '#F8F7F4', ink: '#1B1B19', ink2: '#54534E', ink3: '#8B8A83', accent: '#1B1B19', display: 'Fraunces', body: 'Hanken Grotesk' },
  indigo: { bg: '#F5F5F8', surface: '#FBFBFE', ink: '#1A1830', ink2: '#4E4C6A', ink3: '#8A88A0', accent: '#4338E0', display: 'Bricolage Grotesque', body: 'Inter' },
}
const DEFAULT = 'blueprint'

const COLOR_KEYS = ['bg', 'surface', 'ink', 'ink2', 'ink3', 'accent']
const COLOR_META = [
  { key: 'bg', label: 'Background', id: 'c-bg', hexId: 'h-bg' },
  { key: 'surface', label: 'Surface', id: 'c-surface', hexId: 'h-surface' },
  { key: 'ink', label: 'Text & 3D', id: 'c-ink', hexId: 'h-ink' },
  { key: 'ink2', label: 'Secondary text', id: 'c-ink2', hexId: 'h-ink2' },
  { key: 'ink3', label: 'Muted text', id: 'c-ink3', hexId: 'h-ink3' },
  { key: 'accent', label: 'Accent', id: 'c-accent', hexId: 'h-accent' },
]

const root = document.documentElement
const S = (k, v) => root.style.setProperty(k, v)
function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16)
  return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')'
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

function colorsFromPreset(name) {
  const p = PRESETS[name]
  return { bg: p.bg, surface: p.surface, ink: p.ink, ink2: p.ink2, ink3: p.ink3, accent: p.accent }
}

export default function ThemeBuilder({ applyThemeRef }) {
  const [open, setOpen] = useState(false)
  const [colors, setColors] = useState(() => colorsFromPreset(DEFAULT))
  const [display, setDisplay] = useState(PRESETS[DEFAULT].display)
  const [body, setBody] = useState(PRESETS[DEFAULT].body)
  const [gridVal, setGridVal] = useState(5)

  /* colors + derived hairlines/grid/three vars → repaint on any change */
  useEffect(() => {
    const gridAlpha = (gridVal / 10) * 0.1
    S('--bg', colors.bg); S('--surface', colors.surface); S('--ink', colors.ink)
    S('--ink-2', colors.ink2); S('--ink-3', colors.ink3); S('--accent', colors.accent)
    S('--line', hexA(colors.ink, 0.16)); S('--line-strong', hexA(colors.ink, 0.30)); S('--grid', hexA(colors.ink, gridAlpha))
    S('--three-ink', colors.ink); S('--three-accent', colors.accent)
    applyThemeRef.current()
  }, [colors, gridVal, applyThemeRef])

  /* display typeface */
  useEffect(() => {
    const f = DISPLAY[display]; if (!f) return
    ensureFont(f.css); S('--display', f.stack); S('--dw', f.dw); S('--dtrack', f.tk)
  }, [display])

  /* body typeface */
  useEffect(() => {
    const f = BODY[body]; if (!f) return
    ensureFont(f.css); S('--sans', f.stack)
  }, [body])

  /* Escape closes the drawer */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  function loadPreset(name) {
    const p = PRESETS[name]; if (!p) return
    setColors(colorsFromPreset(name))
    setDisplay(p.display)
    setBody(p.body)
  }
  function reset() {
    setGridVal(5)
    loadPreset(DEFAULT)
  }
  function onColor(key, value) {
    setColors((c) => ({ ...c, [key]: value }))
  }

  return (
    <>
      <button
        className="cz-tab"
        id="cz-open"
        aria-label="Customize the theme"
        aria-expanded={open ? 'true' : 'false'}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="sw"></span>Customize
      </button>

      <aside
        className={open ? 'cz open' : 'cz'}
        id="cz"
        aria-label="Theme builder"
        aria-hidden={open ? 'false' : 'true'}
      >
        <div className="cz-head">
          <h2>Customize</h2>
          <button className="x" id="cz-close" aria-label="Close" onClick={() => setOpen(false)}>✕</button>
        </div>
        <p className="cz-sub">Make it yours. Opens in the default for everyone.</p>

        <div className="cz-grp">
          <span className="cz-lbl">Presets</span>
          <div className="cz-presets">
            <button data-preset="blueprint" onClick={() => loadPreset('blueprint')}>Blueprint</button>
            <button data-preset="graphite" onClick={() => loadPreset('graphite')}>Graphite</button>
            <button data-preset="indigo" onClick={() => loadPreset('indigo')}>Indigo</button>
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
                  onChange={(e) => onColor(m.key, e.target.value)}
                />
              </span>
            </div>
          ))}
        </div>

        <div className="cz-grp">
          <span className="cz-lbl">Type</span>
          <label className="cz-lbl" htmlFor="f-display" style={{ textTransform: 'none', letterSpacing: 0, color: 'var(--ink-2)', fontFamily: 'var(--sans)', fontSize: '0.8rem' }}>Display</label>
          <select className="cz-select" id="f-display" value={display} onChange={(e) => setDisplay(e.target.value)}>
            {Object.keys(DISPLAY).map((n) => <option key={n}>{n}</option>)}
          </select>
          <label className="cz-lbl" htmlFor="f-body" style={{ textTransform: 'none', letterSpacing: 0, color: 'var(--ink-2)', fontFamily: 'var(--sans)', fontSize: '0.8rem', marginTop: '0.8rem' }}>Body</label>
          <select className="cz-select" id="f-body" value={body} onChange={(e) => setBody(e.target.value)}>
            {Object.keys(BODY).map((n) => <option key={n}>{n}</option>)}
          </select>
        </div>

        <div className="cz-grp">
          <span className="cz-lbl">Grid intensity</span>
          <input
            type="range"
            className="cz-range"
            id="g-range"
            min="0"
            max="10"
            value={gridVal}
            onChange={(e) => setGridVal(Number(e.target.value))}
          />
        </div>

        <button className="cz-reset" id="cz-reset" onClick={reset}>Reset to default</button>
      </aside>
    </>
  )
}
