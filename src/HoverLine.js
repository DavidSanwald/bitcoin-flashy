import React from 'react'
import { useSpring, animated } from 'react-spring/hooks'

export default function HoverLine({ y1, y2, x, styles }) {
  const props = useSpring({
    x
  })
  return (
    <animated.line
      {...styles}
      y1={y1}
      y2={y2}
      x1={props.x}
      x2={props.x}
      stroke="#00f2ff"
      strokeWidth="2"
      strokeDasharray="2,2"
    />
  )
}
