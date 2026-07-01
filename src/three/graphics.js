import * as THREE from 'three'

/*
 * Ported verbatim from the reference.html IIFE: one WebGLRenderer draws every
 * [data-graphic] element as its own Scene + PerspectiveCamera viewport.
 * Returns { applyTheme, dispose }.
 */
export function initGraphics() {
  const canvas = document.getElementById('webgl')
  if (!canvas) return { applyTheme: () => {}, dispose: () => {} }

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  renderer.autoClear = false

  const inkMats = []
  const accentMats = []
  function lineMat(op) { const m = new THREE.LineBasicMaterial({ color: 0x15202e, transparent: true, opacity: op == null ? 0.75 : op }); inkMats.push(m); return m }
  function ptMat(size, op) { const m = new THREE.PointsMaterial({ color: 0x2d5bd6, size: size, transparent: true, opacity: op == null ? 0.95 : op }); accentMats.push(m); return m }
  function vpts(a) { return new THREE.BufferGeometry().setFromPoints(a) }
  function V(x, y, z) { return new THREE.Vector3(x, y, z || 0) }

  function applyTheme() {
    const cs = getComputedStyle(document.documentElement)
    const ink = cs.getPropertyValue('--three-ink').trim(), acc = cs.getPropertyValue('--three-accent').trim()
    if (ink) inkMats.forEach(function (m) { m.color.set(ink) })
    if (acc) accentMats.forEach(function (m) { m.color.set(acc) })
  }

  function hero(s, c) { c.position.set(0, 0, 3.3); const g = new THREE.IcosahedronGeometry(1.15, 1); const grp = new THREE.Group(); grp.add(new THREE.LineSegments(new THREE.EdgesGeometry(g), lineMat(0.65))); grp.add(new THREE.Points(g, ptMat(0.05, 0.9))); s.add(grp); return function (t) { grp.rotation.y = t * 0.18; grp.rotation.x = Math.sin(t * 0.3) * 0.22 } }
  function layers(s, c) { c.position.set(0, 0, 5); const grp = new THREE.Group(), n = 6, sl = []; for (let i = 0; i < n; i++) { const w = 2.3 - i * 0.18; const m = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(w, 0.16, w * 0.5)), lineMat(0.7)); const b = (i - (n - 1) / 2) * 0.36; m.position.y = b; m.userData.base = b; grp.add(m); sl.push(m) } grp.rotation.x = 0.42; s.add(grp); return function (t) { grp.rotation.y = t * 0.24; for (let i = 0; i < sl.length; i++) sl[i].position.y = sl[i].userData.base + Math.sin(t * 1.1 + i * 0.6) * 0.03 } }
  function flow(s, c) { c.position.set(0, 0, 4); s.add(new THREE.Line(vpts([V(-2, 0), V(1, 0)]), lineMat(0.45))); s.add(new THREE.Line(vpts([V(1, -0.8), V(1, 0.8)]), lineMat(0.8))); const node = new THREE.Points(vpts([V(1.6, 0)]), ptMat(0.18, 1)); s.add(node); const cnt = 5, p = [], pos = new Float32Array(cnt * 3), pg = new THREE.BufferGeometry(); for (let i = 0; i < cnt; i++) p.push(-2 + i * 0.55); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3)); s.add(new THREE.Points(pg, ptMat(0.1, 0.95))); return function (t) { for (let i = 0; i < cnt; i++) { p[i] += 0.012; if (p[i] > 1) p[i] = -2; pos[i * 3] = p[i]; pos[i * 3 + 1] = 0; pos[i * 3 + 2] = 0 } pg.attributes.position.needsUpdate = true; node.material.size = 0.16 + Math.sin(t * 2) * 0.05 } }
  function emit(s, c) { c.position.set(0, 0, 4.2); const cube = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(0.9, 0.9, 0.9)), lineMat(0.75)); cube.position.x = -1.2; s.add(cube); const d = []; for (let i = 0; i < 4; i++) { const m = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(0.5, 0.66)), lineMat(0.7)); s.add(m); d.push(m) } return function (t) { cube.rotation.x = t * 0.4; cube.rotation.y = t * 0.5; for (let i = 0; i < d.length; i++) { const q = ((t * 0.16 + i * 0.25) % 1); d[i].position.x = -0.5 + q * 1.8; d[i].position.y = Math.sin(i * 1.7) * 0.45; d[i].material.opacity = 0.7 * (1 - q) } } }
  function converge(s, c) { c.position.set(0, 0, 4.6); const cnt = 20, pos = new Float32Array(cnt * 3), home = [], pg = new THREE.BufferGeometry(); for (let i = 0; i < cnt; i++) { const a = Math.random() * Math.PI * 2, r = 1.3 + Math.random() * 0.7; home.push([-1.6 + Math.cos(a) * 0.35 * r, Math.sin(a) * r]) } pg.setAttribute('position', new THREE.BufferAttribute(pos, 3)); s.add(new THREE.Points(pg, ptMat(0.07, 0.9))); s.add(new THREE.Points(vpts([V(0, 0)]), ptMat(0.22, 1))); const outs = [];[0.7, 0, -0.7].forEach(function (y) { s.add(new THREE.Line(vpts([V(0.1, 0), V(1.4, y)]), lineMat(0.5))); const o = new THREE.Points(vpts([V(1.5, y)]), ptMat(0.13, 1)); s.add(o); outs.push(o) }); return function (t) { const k = Math.sin(t * 0.55) * 0.5 + 0.5; for (let i = 0; i < cnt; i++) { pos[i * 3] = home[i][0] * (1 - k); pos[i * 3 + 1] = home[i][1] * (1 - k); pos[i * 3 + 2] = 0 } pg.attributes.position.needsUpdate = true; for (let j = 0; j < outs.length; j++) outs[j].material.size = 0.11 + Math.sin(t * 2 + j) * 0.03 } }
  function transform(s, c) { c.position.set(0, 0, 4.2);[-0.15, 0.15].forEach(function (x) { s.add(new THREE.Line(vpts([V(x, -1.1), V(x, 1.1)]), lineMat(0.4))) }); const cnt = 9, pos = new Float32Array(cnt * 3), st = [], pg = new THREE.BufferGeometry(); for (let i = 0; i < cnt; i++) st.push({ x: -2 + Math.random() * -0.4, y: (Math.random() * 2 - 1) * 0.9, tgt: (i / (cnt - 1) - 0.5) * 1.6 }); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3)); s.add(new THREE.Points(pg, ptMat(0.08, 0.92))); return function () { for (let i = 0; i < cnt; i++) { st[i].x += 0.011; if (st[i].x > 2.2) { st[i].x = -2.2; st[i].y = (Math.random() * 2 - 1) * 0.9 } let y = st[i].y; if (st[i].x > 0.15) y = st[i].y + (st[i].tgt - st[i].y) * Math.min(1, (st[i].x - 0.15) / 0.85); pos[i * 3] = st[i].x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = 0 } pg.attributes.position.needsUpdate = true } }

  const F = { hero, layers, flow, emit, converge, transform }
  const views = []
  document.querySelectorAll('[data-graphic]').forEach(function (el) {
    const f = F[el.dataset.graphic]; if (!f) return
    const sc = new THREE.Scene()
    const cam = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    views.push({ el: el, scene: sc, camera: cam, update: f(sc, cam) })
  })
  applyTheme()

  function size() { renderer.setSize(window.innerWidth, window.innerHeight, false) }
  size(); window.addEventListener('resize', size)

  function rf(t) {
    const H = window.innerHeight, W = window.innerWidth
    renderer.setScissorTest(false); renderer.clear(); renderer.setScissorTest(true)
    for (let i = 0; i < views.length; i++) {
      const v = views[i], r = v.el.getBoundingClientRect()
      if (r.bottom < 0 || r.top > H || r.right < 0 || r.left > W || r.width === 0) continue
      renderer.setViewport(r.left, H - r.bottom, r.width, r.height)
      renderer.setScissor(r.left, H - r.bottom, r.width, r.height)
      renderer.clearDepth()
      v.camera.aspect = r.width / r.height; v.camera.updateProjectionMatrix()
      v.update(t); renderer.render(v.scene, v.camera)
    }
  }

  let rafId = 0
  let stopped = false
  let clock = null
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    rf(2.0)
  } else {
    clock = new THREE.Clock()
    ;(function loop() {
      if (stopped) return
      if (!document.hidden) rf(clock.getElapsedTime())
      rafId = requestAnimationFrame(loop)
    })()
  }

  function dispose() {
    stopped = true
    if (rafId) cancelAnimationFrame(rafId)
    window.removeEventListener('resize', size)
    views.forEach(function (v) {
      v.scene.traverse(function (obj) {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) obj.material.dispose()
      })
    })
    renderer.dispose()
  }

  return { applyTheme, dispose }
}
