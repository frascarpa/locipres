import React from 'react'
import { Canvas } from '@react-three/fiber'

export const Scene: React.FunctionComponent = (props) => {
  return (
    <Canvas>
      <color attach='background' args={['#141414']} />
      <StaticLights />
      {props.children}
    </Canvas>
  )
}

function StaticLights() {
  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
    </>
  )
}
