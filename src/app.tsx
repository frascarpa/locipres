
import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './app.css'

import { FlagshipGyro } from '@/demos/flagship-gyro/flagship-gyro-demo'
import { FlagshipDnd } from '@/demos/flagship-dnd/flagship-dnd-demo'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='flag-gyro' element={<FlagshipGyro />} />
        <Route path='flag-dnd' element={<FlagshipDnd />} />
      </Routes>
    </div>
  )
}

function Home() {
  return (
    <>
      <nav>
        <Link to='/flag-gyro'>flag-gyro</Link>
        <Link to='/flag-dnd'>flag-dnd</Link>
      </nav>
    </>
  )
}
