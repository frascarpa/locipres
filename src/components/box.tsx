import React, { useRef, useState } from 'react'
import { ThreeElements, useFrame } from '@react-three/fiber'
import { Quaternion } from 'three'

interface BoxProps {
  scale?: number;
  size: [number, number, number];
  position?: [number, number, number];
  initialRotation?: [number, number, number];
  autorotate?: 'x' | 'y' | 'z';
  autorotateSpeed?: number;
  quaternion?: Quaternion

}

export const Box: React.FunctionComponent<BoxProps> = (props) => {
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
      quaternion={props.quaternion}
    >
      <boxGeometry args={props.size ?? [1, 1, 1]} />
      <meshNormalMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export function Box1() {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<ThreeElements['mesh']>()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => { if (ref?.current) { ref.current.rotation.x += 0.01 } })
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}
