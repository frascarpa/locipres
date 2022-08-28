import { Scene } from '@/components/scene'
import { Box } from '@/components/box'
import { Link } from 'react-router-dom'

export function BoxDemo() {
  return (
    <Scene>
      <Box
        size={[1, 2, 1]}
        initialRotation={[0.4, 0, 0]}
        autorotate='y'
      />
    </Scene>
  )
}

const g = new Gyroscope()
