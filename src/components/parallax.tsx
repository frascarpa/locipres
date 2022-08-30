import { FunctionComponent, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { Euler, Group, Quaternion, Vector3 } from 'three'
import { Gyro, GyroContext } from './gyro'

interface ParallaxProps {
  influence?: number;
  layerDistance: number;
  layerMap: {
    foreground1?: JSX.Element
    foreground0?: JSX.Element
    center?: JSX.Element
    background0?: JSX.Element
    background1?: JSX.Element
  }
}

type LayerModifier = { position: Group['position'] };
type LayerMap3D = Record<keyof ParallaxProps['layerMap'], LayerModifier>

function computeParallax(quaternion: Quaternion, layerDistance: number, influence: number): LayerMap3D {
  const euler = (new Euler()).setFromQuaternion(quaternion)

  const xOffset = influence * Math.sin(euler.y * Math.PI)

  const out: LayerMap3D | {} = {}

  return {
    foreground1: {
      position: new Vector3(xOffset, 0, 2 * layerDistance),
    },
    foreground0: {
      position: new Vector3(xOffset * 0.5, 0, layerDistance),
    },
    center: {
      position: new Vector3(0, 0, 0),
    },
    background0: {
      position: new Vector3(-xOffset * 0.5, 0, -layerDistance),
    },
    background1: {
      position: new Vector3(-xOffset, 0, -2 * layerDistance),
    },
  }
}

// ==========================================================

export function Parallax(props: PropsWithChildren<ParallaxProps>) {
  const quaternion = useContext(GyroContext)

  return (
    <Gyro>
      <ParallaxWrapped {...props} />
    </Gyro>
  )
}

export const ParallaxWrapped = (props: PropsWithChildren<ParallaxProps>) => {
  const quaternion = useContext(GyroContext)

  const [layerMap3D, setLayerMap3D] = useState<LayerMap3D>()

  useEffect(() => {
    setLayerMap3D(computeParallax(quaternion, props.layerDistance ?? 2, props.influence ?? 1))
  }, [quaternion, props.layerDistance])

  return (
    <>
      <group position={layerMap3D?.foreground1.position}>{props.layerMap.foreground1}</group>
      <group position={layerMap3D?.foreground0.position}>{props.layerMap.foreground0}</group>
      <group position={layerMap3D?.center.position}>{props.layerMap.center}</group>
      <group position={layerMap3D?.background0.position}>{props.layerMap.background0}</group>
      <group position={layerMap3D?.background1.position}>{props.layerMap.background1}</group>
    </>
  )
}
