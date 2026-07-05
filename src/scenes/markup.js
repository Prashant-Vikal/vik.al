/*
 * SVG scene inner-markup, ported verbatim from reference.html.
 * Embedded via dangerouslySetInnerHTML so the markup (class=, hyphenated SVG
 * attributes, coordinates, the <g transform> centering wrappers) stays
 * byte-identical to the source of truth. anime.js drives them by selector;
 * colours come from the .f1..f5/.fi/.fs/.fb/.fm classes in the stylesheet.
 */

export const SCENES = [
  {
    id: 'sc-layers',
    tag: 'responsibility layers',
    ariaLabel: 'Illustrated animation: six labeled responsibility layers drop into a stack on a stable base, then the top layer adapts.',
    html: `<g transform="translate(0,-23)">
              <ellipse cx="160" cy="200" rx="104" ry="8" class="fm" opacity="0.16"/>
              <rect x="60" y="188" width="200" height="8" rx="4" class="fm" opacity="0.4"/>
              <g class="lyr"><rect x="72" y="168" width="176" height="18" rx="5" class="fi"/><rect x="72" y="168" width="6" height="18" rx="3" class="white" opacity="0.55"/><text class="clab" x="88" y="180">tokens</text></g><g class="lyr"><rect x="84" y="146" width="158" height="18" rx="5" class="f1"/><rect x="84" y="146" width="6" height="18" rx="3" class="white" opacity="0.55"/><text class="clab" x="100" y="158">elements</text></g><g class="lyr"><rect x="96" y="124" width="140" height="18" rx="5" class="f2"/><rect x="96" y="124" width="6" height="18" rx="3" class="white" opacity="0.55"/><text class="clab" x="112" y="136">patterns</text></g><g class="lyr"><rect x="108" y="102" width="122" height="18" rx="5" class="f3"/><rect x="108" y="102" width="6" height="18" rx="3" class="white" opacity="0.55"/><text class="clab" x="124" y="114">components</text></g><g class="lyr"><rect x="120" y="80" width="104" height="18" rx="5" class="f4"/><rect x="120" y="80" width="6" height="18" rx="3" class="white" opacity="0.55"/><text class="clab" x="136" y="92">flows</text></g><g class="lyr"><rect x="132" y="58" width="86" height="18" rx="5" class="f5"/><rect x="132" y="58" width="6" height="18" rx="3" class="white" opacity="0.55"/><text class="clab" x="148" y="70">surfaces</text></g>
            </g>`,
  },
  {
    id: 'sc-flow',
    tag: 'compute · then human',
    ariaLabel: 'Illustrated animation: a scorecard fills with ratings, a recommendation appears, then a human stamp presses Approve.',
    html: `<g transform="translate(0,-5)">
              <rect x="18" y="40" width="130" height="150" rx="12" class="fs sl"/>
              <circle cx="42" cy="66" r="12" class="f1"/>
              <rect x="60" y="58" width="60" height="7" rx="3.5" class="fm" opacity="0.5"/>
              <rect x="60" y="70" width="40" height="6" rx="3" class="fm" opacity="0.3"/>
              <rect x="34" y="104" width="88" height="7" rx="3.5" class="fb"/><rect x="34" y="104" width="88" height="7" rx="3.5" class="bar f1"/><rect x="34" y="121" width="88" height="7" rx="3.5" class="fb"/><rect x="34" y="121" width="88" height="7" rx="3.5" class="bar f2"/><rect x="34" y="138" width="88" height="7" rx="3.5" class="fb"/><rect x="34" y="138" width="88" height="7" rx="3.5" class="bar f4"/>
              <g class="rec"><rect x="34" y="162" width="98" height="16" rx="8" class="f4"/><text class="clab" x="44" y="173">RECOMMENDS</text></g>
              <line x1="164" y1="52" x2="164" y2="178" class="sl" stroke-dasharray="3 4"/>
              <g class="stamp">
                <rect x="196" y="82" width="86" height="66" rx="12" class="fs" stroke="var(--viz2)" stroke-width="2.6" fill="var(--surface)"/>
                <path class="chk" d="M212 116 l9 10 l16 -20"/>
                <text class="dlab" x="216" y="140" style="fill:var(--viz2);font-size:8px;letter-spacing:0.1em">APPROVED</text>
              </g>
            </g>`,
  },
  {
    id: 'sc-emit',
    tag: 'component · to docs',
    ariaLabel: 'Illustrated animation: a scan line reads a component and documentation lines write themselves onto stacked pages.',
    html: `<g transform="translate(0,0)">
              <rect x="20" y="44" width="124" height="132" rx="10" class="fs sl"/>
              <rect x="20" y="44" width="124" height="22" rx="10" class="f1"/>
              <rect x="20" y="56" width="124" height="10" class="f1"/>
              <rect x="34" y="86" width="96" height="10" rx="3" class="fm" opacity="0.3"/>
              <rect x="34" y="104" width="70" height="10" rx="3" class="fm" opacity="0.3"/>
              <rect x="34" y="136" width="40" height="16" rx="5" class="f3"/><rect x="82" y="136" width="40" height="16" rx="5" class="fb sl"/>
              <rect class="scan f4" x="18" y="46" width="128" height="4" rx="2" fill="var(--viz4)" opacity="0.9"/>
              <rect x="176" y="42" width="126" height="40" rx="7" class="fs sl"/><rect x="176" y="42" width="6" height="40" rx="3" class="f2"/><rect x="192" y="51" width="86" height="4" rx="2" class="dline fm" opacity="0.55"/><rect x="192" y="60" width="72" height="4" rx="2" class="dline fm" opacity="0.55"/><rect x="192" y="69" width="58" height="4" rx="2" class="dline fm" opacity="0.55"/><rect x="176" y="90" width="126" height="40" rx="7" class="fs sl"/><rect x="176" y="90" width="6" height="40" rx="3" class="f2"/><rect x="192" y="99" width="86" height="4" rx="2" class="dline fm" opacity="0.55"/><rect x="192" y="108" width="72" height="4" rx="2" class="dline fm" opacity="0.55"/><rect x="192" y="117" width="58" height="4" rx="2" class="dline fm" opacity="0.55"/><rect x="176" y="138" width="126" height="40" rx="7" class="fs sl"/><rect x="176" y="138" width="6" height="40" rx="3" class="f2"/><rect x="192" y="147" width="86" height="4" rx="2" class="dline fm" opacity="0.55"/><rect x="192" y="156" width="72" height="4" rx="2" class="dline fm" opacity="0.55"/><rect x="192" y="165" width="58" height="4" rx="2" class="dline fm" opacity="0.55"/>
            </g>`,
  },
  {
    id: 'sc-converge',
    tag: 'knowledge · to outputs',
    ariaLabel: 'Illustrated animation: scattered knowledge scraps converge into a core that emits onboarding, tutorials, and review cards.',
    html: `<g transform="translate(0,0)"><g class="scrap" data-dx="108" data-dy="58" transform="rotate(10 32 54)"><rect x="24" y="46" width="16" height="16" rx="3" class="f1"/><rect x="27" y="50" width="10" height="2" rx="1" class="white" opacity="0.7"/><rect x="27" y="54" width="7" height="2" rx="1" class="white" opacity="0.7"/></g><g class="scrap" data-dx="102" data-dy="-54" transform="rotate(8 38 166)"><rect x="30" y="158" width="16" height="16" rx="3" class="f2"/><rect x="33" y="162" width="10" height="2" rx="1" class="white" opacity="0.7"/><rect x="33" y="166" width="7" height="2" rx="1" class="white" opacity="0.7"/></g><g class="scrap" data-dx="62" data-dy="34" transform="rotate(8 78 78)"><rect x="70" y="70" width="16" height="16" rx="3" class="f4"/><rect x="73" y="74" width="10" height="2" rx="1" class="white" opacity="0.7"/><rect x="73" y="78" width="7" height="2" rx="1" class="white" opacity="0.7"/></g><g class="scrap" data-dx="72" data-dy="-30" transform="rotate(-10 68 142)"><rect x="60" y="134" width="16" height="16" rx="3" class="f5"/><rect x="63" y="138" width="10" height="2" rx="1" class="white" opacity="0.7"/><rect x="63" y="142" width="7" height="2" rx="1" class="white" opacity="0.7"/></g><g class="scrap" data-dx="36" data-dy="2" transform="rotate(-6 104 110)"><rect x="96" y="102" width="16" height="16" rx="3" class="f3"/><rect x="99" y="106" width="10" height="2" rx="1" class="white" opacity="0.7"/><rect x="99" y="110" width="7" height="2" rx="1" class="white" opacity="0.7"/></g><g class="hub"><rect x="120" y="90" width="44" height="44" rx="13" class="f1"/><path d="M142 128 L124 111 L132 104 L152 104 L160 111 Z" fill="#fff"/><path d="M124 111 L160 111 M138 104 L142 111 L146 104 M124 111 L142 128 M160 111 L142 128 M142 111 L142 128" stroke="var(--viz1)" stroke-width="1" stroke-linejoin="round" stroke-linecap="round" fill="none" opacity="0.4"/></g><g class="out"><rect x="214" y="46" width="92" height="36" rx="8" class="fs sl"/><circle cx="228" cy="64" r="6" class="f2"/><text class="dlab" x="240" y="68">Onboarding</text></g><g class="out"><rect x="214" y="92" width="92" height="36" rx="8" class="fs sl"/><circle cx="228" cy="110" r="6" class="f3"/><text class="dlab" x="240" y="114">Tutorials</text></g><g class="out"><rect x="214" y="138" width="92" height="36" rx="8" class="fs sl"/><circle cx="228" cy="156" r="6" class="f4"/><text class="dlab" x="240" y="160">Review</text></g></g>`,
  },
  {
    id: 'sc-transform',
    tag: 'opinion · to evidence',
    ariaLabel: 'Illustrated animation: a vague opinion passes through a facilitation lens and becomes a structured evidence card, with the AI beside the flow.',
    html: `<g transform="translate(0,0)">
              <g class="bub"><rect x="20" y="92" width="80" height="40" rx="11" class="fs" stroke="var(--viz5)" stroke-width="1.8" fill="var(--surface)"/><path d="M34 132 l0 12 l12 -12 z" class="fs" stroke="var(--viz5)" stroke-width="1.8" fill="var(--surface)"/><text class="dlab" x="34" y="116" style="fill:var(--viz5)">i like B</text></g>
              <rect x="150" y="54" width="22" height="112" rx="11" class="f3" opacity="0.16"/>
              <rect x="150" y="54" width="22" height="112" rx="11" fill="none" stroke="var(--viz3)" stroke-width="1.4" stroke-dasharray="3 4"/>
              <g class="ai"><path d="M161 58 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 z" class="f4"/></g>

              <g class="ev"><rect x="196" y="60" width="108" height="98" rx="11" class="fs sl"/><rect x="196" y="60" width="108" height="18" rx="11" class="f3"/><rect x="196" y="69" width="108" height="9" class="f3"/><text class="clab" x="208" y="73">EVIDENCE</text><g class="evrow"><rect x="220" y="78" width="76" height="4" rx="2" class="fm" opacity="0.4"/><path class="evchk" d="M206 84 l4 4 l8 -9"/></g><g class="evrow"><rect x="220" y="104" width="76" height="4" rx="2" class="fm" opacity="0.4"/><path class="evchk" d="M206 110 l4 4 l8 -9"/></g><g class="evrow"><rect x="220" y="130" width="76" height="4" rx="2" class="fm" opacity="0.4"/><path class="evchk" d="M206 136 l4 4 l8 -9"/></g></g>
            </g>`,
  },
]
