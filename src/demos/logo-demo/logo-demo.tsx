import { Box } from '@/components/box'
import { Parallax } from '@/components/parallax'
import { Scene } from '@/components/scene'
import { OrbitControls, OrbitControlsProps } from '@react-three/drei'
import { useEffect, useRef } from 'react'

export function ParallaxDemo() {
  const ref = useRef<any>()
  useEffect(() => {
    console.log(ref)
  }, [ref])

  return (
    <Scene initialPosition={[0, 2, 8]}>
      <OrbitControls ref={ref} />
      <Parallax layerMap={{
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
