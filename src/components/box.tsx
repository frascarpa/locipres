import { FunctionComponent, useContext, useRef, useState } from 'react'
import { ThreeElements, useFrame } from '@react-three/fiber'
import { Quaternion } from 'three'
import { Gyro, GyroContext } from './gyro'

interface BoxProps {
  scale?: number;
  size: [number, number, number];
  position?: [number, number, number];
  initialRotation?: [number, number, number];
  autorotate?: 'x' | 'y' | 'z';
  autorotateSpeed?: number;

}

export const Box: FunctionComponent<BoxProps> = (props) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<ThreeElements['mesh']>()

  const [hovered, hover] = useState(false)

  // Subscribe this component to the render-loop, manipulate the mesh every frame
  useFrame((state, delta) => {
    if (ref?.current && props?.autorotate) {
      ref.current.rotation[props?.autorotate] += props.autorotateSpeed ?? 0.005
    }
  })

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      ref={ref}
      scale={props.scale ?? 1}
      rotation={props.initialRotation ?? [0, 0, 0]}
      position={props.position ?? [0, 0, 0]}
    >
      <boxGeometry args={props.size ?? [1, 1, 1]} />
      <meshNormalMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export function GyroBox() {
  const quaternion = useContext(GyroContext)

  return (
    <Gyro>
      <GyroBoxWrapped />
    </Gyro>
  )
}
export function GyroBoxWrapped() {
  const quaternion = useContext(GyroContext)

  return (
    <Box size={1, 2, 1} />
  )
}
