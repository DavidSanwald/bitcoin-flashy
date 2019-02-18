import React, { useReducer, useRef } from 'react'
import { Group } from '@vx/group'
import { AxisBottom } from '@vx/axis'
import { extent } from 'd3-array'
import { scaleTime, scaleLinear } from 'd3-scale'
import { getTimeFormat, getFormat, compose, closestPoint, lerp } from './utils'
import { line, area, curveCardinal } from 'd3-shape'
import { localPoint, touchPoint } from '@vx/event'
import { GlyphDot } from '@vx/glyph'
import { LinearGradient } from '@vx/gradient'
import MaxPrice from './maxprice'
import MinPrice from './minprice'
import { animated, useSpring } from 'react-spring/hooks'
import Tooltip from './Tooltip'
import 'styled-components/macro'
import {
  hoverCircleStyles,
  glyphStyles,
  areaStyles,
  textStyles,
  lineStyles
} from './styleConfig'

const y = ({ value }) => value
const x = ({ date }) => date
const initState = { isHovered: false, data: [], position: { x: 0, y: 0 } }
function reducer(state, action) {
  const { type } = action
  switch (type) {
    case 'setData':
      return { ...state, data: action.payload }
    case 'move':
      return { ...state, position: action.payload }
    case 'toggle':
      return { ...state, isHovered: action.payload }
    default:
      return state
  }
}

function Chart({ width = 600, height = 400, margin, data }) {
  const svgRef = useRef()
  const tipRef = useRef()
  const outerWidth = width * 0.6
  const outerHeight = height * 0.45
  const [state, dispatch] = useReducer(reducer, initState, {
    type: 'setData',
    payload: data
  })

  const innerWidth = outerWidth - margin.left - margin.right
  const innerHeight = outerHeight - margin.top - margin.bottom
  const [minPrice, maxPrice] = extent(data, y)
  const xScale = scaleTime()
    .range([0, innerWidth])
    .domain(extent(data, x))
  const yScale = scaleLinear()
    .range([innerHeight, 0])
    .domain([minPrice, maxPrice + 100])
  const xAcc = compose(
    xScale,
    x
  )
  const yAcc = compose(
    yScale,
    y
  )
  const lineGen = line()
    .x(xAcc)
    .y(yAcc)
    .curve(curveCardinal)
  const areaGen = area()
    .x(xAcc)
    .y1(yAcc)
    .y0(yScale(minPrice))
    .curve(curveCardinal)
  const linePath = lineGen(data)
  const areaPath = areaGen(data)
  const { date: selectedDate, value: selectedValue } = closestPoint(
    state.position.x,
    xScale,
    data
  )
  const circleProps = useSpring({
    cx: xScale(closestPoint(state.position.x, xScale, data).date),
    cy: xScale(closestPoint(state.position.x, xScale, data).value)
  })
  const toolTipSpringProps = useSpring({
    top: yScale(closestPoint(state.position.x, xScale, data).value),
    left: xScale(closestPoint(state.position.x, xScale, data).date)
  })
  const toolTipWidth = state.isHovered
    ? tipRef.current.getBoundingClientRect().width
    : 1
  return (
    <div>
      <svg width={outerWidth} height={outerHeight} pointerEvents="none">
        <LinearGradient
          id="fill"
          from="#7CFEF0"
          to="#27273f"
          fromOpacity={0.2}
          toOpacity={1}
        />
        <Group left={margin.left} top={margin.top}>
          <rect
            ref={svgRef}
            width={outerWidth}
            fill={'#27273f'}
            height={outerHeight}
            onMouseLeave={() => dispatch({ type: 'toggle', payload: false })}
            onTouchEnd={() => dispatch({ type: 'toggle', payload: false })}
            onMouseEnter={() => dispatch({ type: 'toggle', payload: true })}
            onTouchStart={() => dispatch({ type: 'toggle', payload: true })}
            onMouseMove={event =>
              dispatch({
                type: 'move',
                payload: localPoint(svgRef.current, event)
              })
            }
            onTouchMove={event =>
              dispatch({
                type: 'move',
                payload: touchPoint(svgRef.current, event)
              })
            }
            pointerEvents="all"
          />
          <AxisBottom
            data={data}
            scale={xScale}
            x={x}
            top={innerHeight}
            numTicks={3}
            hideTicks
            hideAxisLine
            tickLabelProps={() => ({ ...textStyles, fontSize: 11 })}
            {...textStyles}
            tickLabelComponent={
              <text
                dy=".33em"
                fillOpacity={0.3}
                fontSize={11}
                textAnchor="middle"
                {...textStyles}
              />
            }
          />
          <MaxPrice
            y={yScale(maxPrice)}
            x1={xScale(data[0].date)}
            x2={xScale(data[data.length - 1].date)}
            textStyles={textStyles}
            lineStyles={lineStyles}
            yText={yScale(maxPrice)}
            label={getFormat(maxPrice)}
          />
          <MinPrice
            y={yScale(minPrice)}
            textStyles={textStyles}
            lineStyles={lineStyles}
            x1={xScale(data[0].date)}
            x2={xScale(data[data.length - 1].date)}
            yText={yScale(minPrice)}
            label={getFormat(minPrice)}
          />
          <path d={linePath} {...lineStyles} />
          <path d={areaPath} {...areaStyles} />
          {data.map((d, i) => {
            const cx = xAcc(d)
            const cy = yAcc(d)
            return (
              <g key={`line-point-${i}`}>
                <GlyphDot cx={cx} cy={cy} {...glyphStyles} />
              </g>
            )
          })}
          {state.isHovered && (
            <animated.circle
              style={{
                cy: circleProps.cx.interpolate(x =>
                  lerp(data, xScale, yScale, x)
                ),
                cx: circleProps.cx
              }}
              {...hoverCircleStyles}
            />
          )}
        </Group>
      </svg>{' '}
      <Tooltip
        ref={tipRef}
        isVisible={state.isHovered}
        style={{ ...toolTipSpringProps }}>
        <span> {getTimeFormat(selectedDate)}</span>
        <span> {getFormat(selectedValue)}</span>
      </Tooltip>
    </div>
  )
}
export default Chart
