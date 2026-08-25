import anime from 'animejs'

/*
 * The five scene timelines, ported verbatim from the reference script.
 * initScenes() runs all five setups and returns:
 *   - registry: { '<scene-id>': [animeInstance, ...] } so callers can
 *     play()/pause() a single scene (used to pause off-screen scenes)
 *   - dispose(): stops/removes every animation (StrictMode-safe cleanup)
 */
export function initScenes() {
  const registry = {}
  if (!anime) return { registry, dispose() {} }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /*
   * Keep-alive: a tiny loop on a plain object (no DOM) so anime's global RAF
   * engine never fully suspends. Without it, when every scene is paused at once
   * (all scenes start off-screen below the full-height hero) anime v3 stops its
   * engine and a later .play() flips the flag but never resumes ticking.
   */
  const keepAlive = reduce ? null : anime({ targets: { v: 0 }, v: 1, duration: 60000, easing: 'linear', loop: true })

  /* 1. VikSchema layers */
  registry['sc-layers'] = (function () {
    const p = '#sc-layers '
    function reset(){ anime.set(p+'.lyr', { opacity: 0, translateY: -46 }); }
    if (reduce) { anime.set(p+'.lyr', { opacity: 1, translateY: 0 }); return []; }
    reset();
    const tl = anime.timeline({ loop: true, loopBegin: reset })
      .add({ targets: p+'.lyr', opacity: [0,1], translateY: [-46,0], duration: 600, delay: anime.stagger(115), easing: 'easeOutBack' })
      .add({ targets: p+'.lyr:last-child', translateY: [0,-4,0], duration: 1500, easing: 'easeInOutSine' }, '+=250')
      .add({ targets: p+'.lyr', opacity: 0, duration: 480, delay: anime.stagger(40), easing: 'easeInQuad' }, '+=900');
    return [tl];
  })();

  /* 2. Throughline compute then human */
  registry['sc-flow'] = (function () {
    const p = '#sc-flow '
    function reset(){
      anime.set(p+'.bar', { scaleX: 0 });
      anime.set(p+'.rec', { opacity: 0, scale: 0.6 });
      anime.set(p+'.stamp', { opacity: 0, translateY: -58, rotate: '-16deg' });
      anime.set(p+'.chk', { strokeDashoffset: 30 });
    }
    if (reduce) {
      anime.set(p+'.bar', { scaleX: 1 }); anime.set(p+'.rec', { opacity: 1, scale: 1 });
      anime.set(p+'.stamp', { opacity: 1, translateY: 0, rotate: '0deg' }); anime.set(p+'.chk', { strokeDashoffset: 0 }); return [];
    }
    reset();
    const tl = anime.timeline({ loop: true, loopBegin: reset })
      .add({ targets: p+'.bar', scaleX: [0,1], duration: 520, delay: anime.stagger(140), easing: 'easeOutQuart' })
      .add({ targets: p+'.rec', opacity: 1, scale: [0.6,1], duration: 420, easing: 'easeOutBack' }, '-=120')
      .add({ targets: p+'.stamp', opacity: 1, translateY: [-58,0], rotate: ['-16deg','0deg'], duration: 560, easing: 'easeOutBack' }, '+=140')
      .add({ targets: p+'.chk', strokeDashoffset: [30,0], duration: 380, easing: 'easeInOutSine' }, '-=140')
      .add({ targets: [p+'.stamp', p+'.bar', p+'.rec'], opacity: 0, duration: 460, easing: 'easeInQuad' }, '+=1000');
    return [tl];
  })();

  /* 3. Handsoff component to docs */
  registry['sc-emit'] = (function () {
    const p = '#sc-emit '
    function reset(){ anime.set(p+'.dline', { scaleX: 0, opacity: 0.55 }); }
    if (reduce) { anime.set(p+'.dline', { scaleX: 1, opacity: 0.55 }); return []; }
    reset();
    const scan = anime({ targets: p+'.scan', translateY: [0,126], duration: 2400, easing: 'easeInOutSine', loop: true, direction: 'alternate' });
    const tl = anime.timeline({ loop: true, loopBegin: reset })
      .add({ targets: p+'.dline', scaleX: [0,1], duration: 300, delay: anime.stagger(95), easing: 'easeOutQuad' })
      .add({ targets: p+'.dline', opacity: [0.55,0.12], duration: 420, delay: anime.stagger(45) }, '+=1100');
    return [scan, tl];
  })();

  /* 4. VikSense converge */
  registry['sc-converge'] = (function () {
    const p = '#sc-converge '
    function reset(){
      anime.set(p+'.scrap', { opacity: 1, translateX: 0, translateY: 0, scale: 1 });
      anime.set(p+'.out', { opacity: 0, translateX: -12 });
    }
    if (reduce) { anime.set(p+'.out', { opacity: 1, translateX: 0 }); return []; }
    reset();
    const tl = anime.timeline({ loop: true, loopBegin: reset })
      .add({ targets: p+'.scrap',
             translateX: function(el){ return +el.getAttribute('data-dx'); },
             translateY: function(el){ return +el.getAttribute('data-dy'); },
             scale: 0.3, opacity: 0, duration: 720, delay: anime.stagger(110), easing: 'easeInQuad' })
      .add({ targets: p+'.hub', scale: [1,1.16,1], duration: 520, easing: 'easeInOutSine' }, '-=320')
      .add({ targets: p+'.out', opacity: 1, translateX: [-12,0], duration: 480, delay: anime.stagger(130), easing: 'easeOutBack' }, '-=120')
      .add({ targets: p+'.out', opacity: 0, duration: 440, delay: anime.stagger(60), easing: 'easeInQuad' }, '+=1100');
    return [tl];
  })();

  /* 5. Review Protocol opinion to evidence */
  registry['sc-transform'] = (function () {
    const p = '#sc-transform '
    function reset(){
      anime.set(p+'.bub', { opacity: 1, translateX: 0 });
      anime.set(p+'.ev', { opacity: 0, scale: 0.9 });
      anime.set(p+'.evrow', { opacity: 0 });
      anime.set(p+'.evchk', { strokeDashoffset: 16 });
    }
    if (reduce) {
      anime.set(p+'.bub', { opacity: 0 }); anime.set(p+'.ev', { opacity: 1, scale: 1 });
      anime.set(p+'.evrow', { opacity: 1 }); anime.set(p+'.evchk', { strokeDashoffset: 0 }); return [];
    }
    reset();
    const ai = anime({ targets: p+'.ai', scale: [1,1.25,1], opacity: [0.7,1,0.7], duration: 1500, easing: 'easeInOutSine', loop: true });
    const tl = anime.timeline({ loop: true, loopBegin: reset })
      .add({ targets: p+'.bub', translateX: [0,122], opacity: [1,0], duration: 900, easing: 'easeInQuad' })
      .add({ targets: p+'.ev', opacity: 1, scale: [0.9,1], duration: 440, easing: 'easeOutBack' }, '-=260')
      .add({ targets: p+'.evrow', opacity: [0,1], duration: 260, delay: anime.stagger(150) }, '-=80')
      .add({ targets: p+'.evchk', strokeDashoffset: [16,0], duration: 300, delay: anime.stagger(150), easing: 'easeInOutSine' }, '-=560')
      .add({ targets: p+'.ev', opacity: 0, duration: 500, easing: 'easeInQuad' }, '+=1000');
    return [ai, tl];
  })();

  return {
    registry,
    dispose() {
      if (keepAlive) keepAlive.pause()
      Object.keys(registry).forEach((id) => anime.remove('#' + id + ' *'))
    },
  }
}
