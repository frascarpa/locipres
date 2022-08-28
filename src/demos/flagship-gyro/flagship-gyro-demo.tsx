import { Scene } from '@/components/scene'
import { Box, Box1 } from '@/components/box'
import { Link } from 'react-router-dom'
import { Watch } from '@/components/watch'
import { Environment } from '@react-three/drei'
// import { Accelerometer } from 'motion-sensors-polyfill'
import { Children, cloneElement, createContext, isValidElement, useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3, Quaternion, Euler } from 'three'
import throttle from 'lodash/throttle'
import React from 'react'
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
