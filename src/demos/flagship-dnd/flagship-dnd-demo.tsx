import { Scene } from '@/components/scene'
import { Box } from '@/components/box'
import { Link } from 'react-router-dom'

import { useRef } from 'react'
import { Canvas, ThreeElements, useFrame } from '@react-three/fiber'
import { useGLTF, PresentationControls, Environment, ContactShadows, Html } from '@react-three/drei'
import { Watch } from '@/components/watch'

export function FlagshipDnd() {
  return (
    <Scene>
      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 5, tension: 500 }}
        rotation={[0, 0.3, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
      >
        <Watch oscillate rotation={[0, 0, 0]} position={[0, 0.25, 0]} scale={0.003} />
      </PresentationControls>

      <Environment preset='city' />

    </Scene>
  )
}
