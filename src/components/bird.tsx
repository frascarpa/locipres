
import { useHelper } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { BoxHelper, Color } from 'three'
import { loadSvgGeometry, ShapeProps, SvgPath, SvgShape } from './svgHelper'

const singletonSvgPath: SvgPath[] | null = null

export function Bird() {
  const [loadedSvg, setShapes] = useState<SvgPath[]>()
  const mesh = useRef()

  useHelper(mesh, BoxHelper, 'cyan')

  useEffect(() => {
    loadSvgGeometry('/twitter.svg')
      .then((res) => {
        setShapes(res)
        console.log(res)
      })
  }, [])

  return (
    <group
      ref={mesh}
      scale={0.003}
    >
      {loadedSvg?.map((shape, index) => {
        const shapeProps: ShapeProps = { ...shape, index: index, color: new Color(0x1DA1F2) }
        return (<SvgShape key={shape?.shape?.uuid} {...shapeProps} />)
      },
      )}
    </group>
  )
}
