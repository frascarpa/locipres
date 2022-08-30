import { Canvas } from '@react-three/fiber'
import { FunctionComponent } from 'react'

interface SceneProps {
  initialPosition?: [number, number, number]
}
export const Scene: FunctionComponent<SceneProps> = (props) => {
  return (
    <Canvas
      style={Object.assign({}, { 'touch-action': 'none' })}
      camera={props.initialPosition ? { position: props.initialPosition } : undefined}
    >
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
