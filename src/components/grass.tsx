import { MeshProps, useLoader } from '@react-three/fiber'
import { FunctionComponent } from 'react'
import { TextureLoader } from 'three'

export const Grass: FunctionComponent<MeshProps> = (props) => {
  const colorMap = useLoader(TextureLoader, 'grass.png')

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
    >
      <boxGeometry args={[2, 4, 0.1]} />
      <meshStandardMaterial
        map={colorMap}
        displacementMap={colorMap}
        transparent
      />
    </mesh>
  )
}
