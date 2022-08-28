import { Scene } from '@/components/scene'
import { Box } from '@/components/box'
import { Watch } from '@/components/watch'
import { Gyro } from '@/components/gyro'

export function GyroBox() {
  return (
    <Scene>
      <Gyro>
        <Box size={[1, 2, 1]} />
      </Gyro>
    </Scene>
  )
}

export function GyroWatch() {
  return (
    <Scene>
      <Gyro>
        <Watch scale={0.0045} />
      </Gyro>
    </Scene>
  )
}
