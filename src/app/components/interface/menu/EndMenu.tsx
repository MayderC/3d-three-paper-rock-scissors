export const EndMenu = () => {
  return (
    <div className="main-menu">
      <div className="start-btn" onClick={() => {
        window.location.reload()
      }} >
        <p>
          Start again
        </p>
      </div>

      <p className="info info-game">
        This game was created by <a className="link" target="_blank" href="https://github.com/MayderC">MayderC </a>
        usin Three.js, React, Blender and TypeScript.
      </p>

    </div>
  )
}
