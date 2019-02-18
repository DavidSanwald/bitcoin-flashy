const backGroundColor = '#27273f'
const primaryChartColor = '#7CFEF0'
const textColor = '#878787'

const lineStyles = {
  stroke: primaryChartColor,
  fill: 'none',
  strokeWidth: 2,
  opacity: 0.2
}
const glyphStyles = {
  stroke: primaryChartColor,
  fill: backGroundColor,
  strokeWidth: 1,
  r: 3,
  fillOpacity: 1,
  strokeOpacity: 0.4
}
const areaStyles = { stroke: 'none', fill: 'url(#fill)', opacity: 0.2 }
const textStyles = { stroke: textColor, fill: 'none', opacity: 0.4 }
const hoverCircleStyles = {
  r: 7,
  stroke: primaryChartColor,
  fill: 'none',
  strokeWidth: 3,
  opacity: 0.8
}
export { areaStyles, hoverCircleStyles, textStyles, lineStyles, glyphStyles }
