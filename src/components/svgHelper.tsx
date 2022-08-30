import { Color } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { DoubleSide, Shape } from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import flatten from 'lodash/flatten'

/**
 * https://gist.github.com/neftaly/7c4d96f1ba37aada7f366b5393e59ddb
 *
 * Use a shape of the SVG to associate a Mesh Material with a Geometry
 */

export interface ShapeProps {
  shape?: Shape | Shape[];
  color?: Color;
  index: number;
}

export function SvgShape({ shape, color, index }: ShapeProps) {
  const mesh = useRef<any>()
  const geom = useRef<any>()

  useEffect(() => {
    geom.current.rotateZ(Math.PI)
    geom.current.center()
    console.log('mesh', mesh)
  })

  return (
    <mesh
      ref={mesh}
    >
      <extrudeGeometry ref={geom} attach='geometry' args={[shape, { depth: 22 }]} />
      <meshPhysicalMaterial
        attach='material'
        color={color}
        opacity={1}
        side={DoubleSide}
        metalness={1}
        roughness={0.5}

        depthWrite
        /*
          HACK: Offset SVG polygons by index
          The paths from SVGLoader Z-fight.
          This fix causes stacking problems with detailed SVGs.
        */
        polygonOffset
        polygonOffsetFactor={(index || 0) * -0.1}
      />
    </mesh>
  )
}

export type SvgPath = { shape: ShapeProps['shape'], index: number };
export function loadSvgGeometry(url: string): Promise<SvgPath[]> {
  return new Promise(resolve => new SVGLoader().load(url,
    shapes => {
      resolve(flatten(shapes.paths.map((group, index) => {
        return group.toShapes(true).map(shape => {
          return ({ shape, index })
        })
      })),
      )
    }),
  )
}
