export default function Footer({ czOpen, onToggleCz }) {
  return (
    <footer className="wrap reveal">
      <div className="tile contact">
        <p className="foot-kicker">Built on structure, not improvisation.</p>
        <a
          className="foot-pdf"
          href="/Prashant-Vikal-VP-of-Design.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Full Executive Briefing (PDF)
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17 17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </a>
        <div className="links">
          <a href="https://www.linkedin.com/in/vik-al/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </div>
      </div>
      <div className="colophon">
        <span>© 2026 Vik Al</span>
        <span>Designed and built end to end</span>
        <button
          className="cz-link"
          id="cz-open"
          aria-expanded={czOpen ? 'true' : 'false'}
          aria-controls="cz"
          onClick={onToggleCz}
        >
          Customize theme
        </button>
      </div>
    </footer>
  )
}
