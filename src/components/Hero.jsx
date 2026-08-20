{/* import { useState } from 'react' */}

/* Inline placeholder silhouette, ported verbatim from reference.html. */
function Placeholder() {
  return (
    <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <rect width="400" height="500" fill="#E8EDF2" />
      <circle cx="200" cy="185" r="70" fill="#B9C6D2" />
      <path d="M80 430 q0 -120 120 -120 q120 0 120 120 v70 h-240 z" fill="#B9C6D2" />
    </svg>
  )
}

export default function Hero() {
  {/* const [failed, setFailed] = useState(false) */}

  return (
    <section className="wrap hero">
      <div className="hero-text">
        <h1 className="load">I design the systems by which design gets done.</h1>
        <p className="sub load">I build the methodology, tooling, and AI-native architecture that allow product teams to ship high-fidelity work predictably and at scale. Most of what I build isn’t the screen. It is the autonomous engine behind it.</p>
        {/* <p className="sub load">Methodology, tooling, and decision systems that let design teams do their best work, repeatably. Most of what I build is not the screen. It is the structure behind it.</p>*/}
        <p className="meta load">Head of Design at Cypherock, 2022 to 2026 · Fourteen years building products and the teams behind them.</p>
      </div>
      
      {/* <figure className="hero-photo load" aria-label="Portrait of Vik Al">
        <span className="corner tl"></span><span className="corner tr"></span><span className="corner bl"></span><span className="corner br"></span>
        {failed ? (
          <>
            <Placeholder />
            <span className="ph-cap">Photo placeholder</span>
          </>
        ) : (
          <img src="/vik.jpg" alt="Portrait of Vik Al" onError={() => setFailed(true)} />
        )}
      </figure> */}
      
      <a className="scroll-cue" href="#pov" aria-label="Scroll for more">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section>
  )
}
