import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { Vector3, Quaternion, Euler } from 'three'
import throttle from 'lodash/throttle'

export const GyroContext = createContext(null)

interface GyroProps {
  frequency?: number;
}

export const Gyro = (props: PropsWithChildren<GyroProps>) => {
  const [quaternion, setQuaternion] = useState(new Quaternion())

  useEffect(() => {
    const frequency = props.frequency ?? 60

    const sensor = new AbsoluteOrientationSensor({ frequency: frequency })

    const updateMesh = throttle(() => {
      if (!sensor.quaternion) {
        return
      }

      const patchedQuaternion = [...sensor.quaternion]
      patchedQuaternion[4] = 0 // patch compass behaviour

      const newQuaternion = new Quaternion().fromArray(patchedQuaternion)
      setQuaternion(
        newQuaternion,
      )
    }, 1000 / frequency)

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
    <GyroContext.Provider value={quaternion}>
      {props?.children}
    </GyroContext.Provider>
  )
}
