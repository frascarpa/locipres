
import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './app.css'

import { FlagshipGyro } from '@/demos/flagship-gyro/flagship-gyro-demo'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='flag-gyro' element={<FlagshipGyro />} />
      </Routes>
    </div>
  )
}

function Home() {
  return (
    <>
      <nav>
        <Link to='/flag-gyro'>flag-gyro</Link>
      </nav>
    </>
  )
}
