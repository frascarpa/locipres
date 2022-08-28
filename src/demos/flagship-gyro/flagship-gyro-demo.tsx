import { Scene } from '@/components/scene'
import { Box, Box1 } from '@/components/box'
import { Link } from 'react-router-dom'
import { Watch } from '@/components/watch'
import { Environment } from '@react-three/drei'
// import { Accelerometer } from 'motion-sensors-polyfill'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3, Quaternion, Euler } from 'three'

import throttle from 'lodash/throttle'

export function FlagshipGyro() {
  return (
    <Scene>
      <GyroWatch />
    </Scene>
  )
}

function GyroWatch() {
  const [quaternion, setQuaternion] = useState(new Quaternion())

  useEffect(() => {
    const sensor = new AbsoluteOrientationSensor({ frequency: 20 })

    const updateMesh = throttle(() => {
      console.log('updating mesh', sensor.quaternion)
      if (!sensor.quaternion) {
        return
      }

      const newQuaternion = new Quaternion().fromArray(sensor.quaternion)
      // [
      //   sensor.quaternion[0], // sensor.,
      //   sensor.quaternion[1], // sensor.y,
      //   0, // sensor.z / GRAVITY * amplitude,
      // ]

      setQuaternion(
        newQuaternion,
      )
    }, 100)

    sensor.onerror = console.error

    sensor.addEventListener('reading', () => {
      updateMesh()
    })

    Promise.all([navigator.permissions.query({ name: 'accelerometer' }),
    navigator.permissions.query({ name: 'magnetometer' }),
    navigator.permissions.query({ name: 'gyroscope' })])
      .then((results) => {
        console.log('asked for sensor permission', results)
        if (results.every((result) => result.state === 'granted')) {
          sensor.start()
          // …
        } else {
          console.log('No permissions to use AbsoluteOrientationSensor.')
        }
      })
  }, [])

  return (
    <Box quaternion={quaternion} position={[0, 0.25, 0]} scale={1} />
  )
}
