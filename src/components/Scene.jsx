export default function Scene({ id, html }) {
  return (
    <svg
      className="scene"
      id={id}
      viewBox="0 0 320 220"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
