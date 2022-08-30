import { Scene } from '@/components/scene'
import { GyroBox } from '@/components/box'
import { GyroWatch } from '@/components/watch'
import { Gyro } from '@/components/gyro'

export function GyroBoxDemo() {
  return (
    <Scene>
      <GyroBox />
    </Scene>
  )
}

export function GyroWatchDemo() {
  return (
    <Scene>
      <GyroWatch />
    </Scene>
  )
}
