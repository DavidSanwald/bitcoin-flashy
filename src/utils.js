import { bisector } from 'd3-array'
import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
const bisectDate = bisector(d => d.date).left
const closestPoint = (xVal, xScale, data) => {
  const bisectDate = bisector(d => xScale(d.date)).left
  const index = bisectDate(data, xVal)
  const left = Math.abs(
    xScale(data[Math.min(index - 1, data.length - 1)]) - xVal
  )
  const right = Math.abs(xScale(data[Math.min(index, data.length - 1)]) - xVal)
  return left < right ? data[index - 1] : data[Math.min(index, data.length - 1)]
}
const closestDatum = (data, date) => {
  const index = bisectDate(data, date)
  const clampIndex = clamp({ min: 0, max: data.length - 1 })
  const left = Math.abs(data[clampIndex(index - 1)] - date)
  const right = Math.abs(data[clampIndex(index)] - date)
  return left < right ? data[clampIndex(index - 1)] : data[clampIndex(index)]
}
const clamp = ({
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY
} = {}) => num => Math.max(min, Math.min(num, max))
const lerp = (data, xScale, yScale, xVal) => {
  const clampIndex = clamp({ min: 0, max: data.length - 1 })
  const date = xScale.invert(xVal)
  const index = bisectDate(data, date)
  const left = data[clampIndex(index - 1)]
  const right = data[clampIndex(index)]
  if (left === right) {
    return yScale(left.value)
  }
  const y0 = yScale(left.value)
  const y1 = yScale(right.value)
  const x0 = xScale(left.date)
  const x1 = xScale(right.date)
  const height =
    y0 * (1 - (xVal - x0) / (x1 - x0)) + y1 * ((xVal - x0) / (x1 - x0))
  return height
}
const getTimeFormat = timeFormat('%b %d')
const getFormat = format('$,.2f')
export {
  getTimeFormat,
  getFormat,
  compose,
  lerp,
  closestDatum,
  closestPoint,
  clamp
}
