import React from 'react'
import { LinearGradient } from '@vx/gradient'

import 'styled-components/macro'

function Background({ width, height }) {
  return (
    <svg width={width} pointerEvents="none" height={height}>
      <LinearGradient id="bg" vertical={false}>
        <stop stopColor="#7CFEF0" offset="0%" />
        <stop stopColor="#2CEAA3" offset="50%" />
        <stop stopColor="#578e6c" offset="100%" />
      </LinearGradient>
      <rect
        width={width}
        height={height}
        pointerEvents="none"
        fill="url(#bg)"
      />
    </svg>
  )
}
export default Background
