
import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './app.css'

import { GyroBoxDemo, GyroWatchDemo } from '@/demos/flagship-gyro/flagship-gyro-demo'
import { FlagshipDnd } from '@/demos/flagship-dnd/flagship-dnd-demo'
import { ParallaxDemo, ParallaxTwitterDemo } from '@/demos/logo-demo/logo-demo'

const routes: [string, () => JSX.Element][] = [
  ['/', Home],
  ['flag-dnd', FlagshipDnd],
  ['gyro-box', GyroBoxDemo],
  ['gyro-watch', GyroWatchDemo],
  ['parallax-demo', ParallaxDemo],
  ['twitter-demo', ParallaxTwitterDemo],

]
export function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <Routes>
        {routes.map(([path, elem]) => (
          <Route key={path} path={path} element={elem()} />
        ))}
      </Routes>
    </div>
  )
}

function Home() {
  return (
    <>
      <nav>
        {routes.map(([path, elem]) => (
          <div key={path}>
            <Link to={path}>{path}</Link>
          </div>
        ))}
      </nav>
    </>
  )
}
