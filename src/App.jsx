import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import PointOfView from './components/PointOfView.jsx'
import Work from './components/Work.jsx'
import Footer from './components/Footer.jsx'
import ThemeBuilder from './components/ThemeBuilder.jsx'
import { initScenes } from './scenes/animate.js'

export default function App() {
  const [czOpen, setCzOpen] = useState(false)

  /* anime.js SVG scenes, paused while off-screen */
  useEffect(() => {
    const { registry, dispose } = initScenes()
    let io
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          const insts = registry[e.target.id]
          if (!insts) return
          insts.forEach((a) => (e.isIntersecting ? a.play() : a.pause()))
        })
      }, { rootMargin: '0px 0px 10% 0px' })
      document.querySelectorAll('.scene').forEach((el) => io.observe(el))
    }
    return () => {
      if (io) io.disconnect()
      dispose()
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
      }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' })
      rev.forEach((e) => io.observe(e))
      return () => io.disconnect()
    }
    rev.forEach((e) => e.classList.add('in'))
  }, [])

  /* Escape closes the drawer */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setCzOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <div className="layer">
        <Header />
        <main>
          <Hero />
          <PointOfView />
          <Work />
        </main>
        <Footer czOpen={czOpen} onToggleCz={() => setCzOpen((o) => !o)} />
      </div>

      <ThemeBuilder open={czOpen} onClose={() => setCzOpen(false)} />
    </>
  )
}
