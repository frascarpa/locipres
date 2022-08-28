import { useGLTF } from '@react-three/drei'
import { ThreeElements, useFrame } from '@react-three/fiber'
import { useContext, useRef } from 'react'
import { GyroContext } from './gyro'

interface WatchProps {
  oscillate?: boolean;
}

export function Watch(props: React.PropsWithChildren<WatchProps & ThreeElements['mesh']>) {
  const ref = useRef<ThreeElements['mesh']>()
  const gltf = useGLTF('/watch-v1.glb')
  const quaternion = useContext(GyroContext)

  useFrame((state) => {
    if (!ref?.current) {
      return
    }

    if (props.oscillate) {
      const t = state.clock.getElapsedTime()
      ref.current.rotation.x = Math.cos(t / 4) / 8
      ref.current.rotation.y = Math.sin(t / 4) / 4
      ref.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20
      ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
    }
  })
  return (
    <primitive {...props} ref={ref} object={gltf.scene} quaternion={quaternion} />
  )
}
