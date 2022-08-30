import { Bird } from '@/components/bird'
import { Box } from '@/components/box'
import { Forest } from '@/components/forest'
import { Grass } from '@/components/grass'
import { Parallax } from '@/components/parallax'
import { Scene } from '@/components/scene'
import { Environment, OrbitControls, OrbitControlsProps, RandomizedLight } from '@react-three/drei'
import { useEffect, useRef } from 'react'

export function ParallaxDemo() {
  return (
    <Scene initialPosition={[0, 2, 8]}>
      <OrbitControls />
      <Parallax
        layerDistance={2}
        layerMap={{
          foreground1: <Box size={[1, 1, 1]} />,
          foreground0: <Box size={[1, 1, 1]} />,
          center: <Box size={[1, 1, 1]} />,
          background0: <Box size={[1, 1, 1]} />,
          background1: <Box size={[1, 1, 1]} />,
        }}
      />
    </Scene>
  )
}

export function ParallaxTwitterDemo() {
  return (
    <Scene initialPosition={[0, 0, 2]}>
      <OrbitControls />
      <Parallax
        layerDistance={0.5}
        layerMap={{
          foreground1: <RandomizedLight castShadow amount={3} />,
          foreground0: <Grass />,
          // center: <Bird />,
          background0: <Bird />,
          background1: <Forest />,
        }}
      />
    </Scene>
  )
}
