import React from 'react'

export default ({ label, yText, x1, x2, y, lineStyles, textStyles }) => {
  return (
    <g>
      <line
        y1={y}
        y2={y}
        x1={x1}
        x2={x2}
        strokeDasharray="4,4"
        {...lineStyles}
      />
      <text {...textStyles} y={yText} dy="-1.3em" dx="10px" fontSize="12">
        {label}
      </text>
    </g>
  )
}
