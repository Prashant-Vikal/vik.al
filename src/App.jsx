import { useEffect, useRef } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import PointOfView from './components/PointOfView.jsx'
import Work from './components/Work.jsx'
import Footer from './components/Footer.jsx'
import ThemeBuilder from './components/ThemeBuilder.jsx'
import { initGraphics } from './three/graphics.js'

export default function App() {
  const applyThemeRef = useRef(() => {})

  /* three.js: one renderer drawing every [data-graphic] viewport */
  useEffect(() => {
    const { applyTheme, dispose } = initGraphics()
    applyThemeRef.current = applyTheme
    return () => {
      dispose()
      applyThemeRef.current = () => {}
    }
  }, [])

  /* scroll reveals */
  useEffect(() => {
    const rev = document.querySelectorAll('.reveal')
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((en) => {
        en.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
        })
      }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' })
      rev.forEach((e) => io.observe(e))
      return () => io.disconnect()
    }
    rev.forEach((e) => e.classList.add('in'))
  }, [])

  return (
    <>
      <canvas id="webgl"></canvas>

      <div className="layer">
        <Header />
        <main>
          <Hero />
          <PointOfView />
          <Work />
        </main>
        <Footer />
      </div>

      <ThemeBuilder applyThemeRef={applyThemeRef} />
    </>
  )
}
