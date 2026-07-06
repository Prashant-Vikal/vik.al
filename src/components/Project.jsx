import Scene from './Scene.jsx'

export default function Project({ label, name, href, desc, go, scene, flip }) {
  return (
    <article className={flip ? 'project flip' : 'project'}>
      <div className="project-text">
        <span className="eyebrow ink">{label}</span>
        {href ? (
          <a className="name" href={href} target="_blank" rel="noopener noreferrer">{name}</a>
        ) : (
          <span className="name">{name}</span>
        )}
        <p className="desc">{desc}</p>
        {href ? (
          <a className="go live" href={href} target="_blank" rel="noopener noreferrer">Visit <span className="arrow">↗</span></a>
        ) : (
          <span className="go">{go}</span>
        )}
      </div>
      <figure className="graphic" aria-label={scene.ariaLabel}>
        <span className="corner tl"></span><span className="corner tr"></span><span className="corner bl"></span><span className="corner br"></span>
        <Scene id={scene.id} html={scene.html} />
        <span className="tag">{scene.tag}</span>
      </figure>
    </article>
  )
}
