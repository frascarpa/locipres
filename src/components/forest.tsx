import { MeshProps, useLoader } from '@react-three/fiber'
import { FunctionComponent } from 'react'
import { DoubleSide, TextureLoader } from 'three'

export const Forest: FunctionComponent<MeshProps> = (props) => {
  const colorMap = useLoader(TextureLoader, 'forest.jpg')

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
    >
      <cylinderGeometry args={[10, 10, 20, 10]} />
      <meshStandardMaterial map={colorMap} side={DoubleSide} />
    </mesh>
  )
}
