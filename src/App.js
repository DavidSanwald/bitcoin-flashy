import React from 'react'
import useWindowSize from './useWindowSize'
import useFetch from './useFetch'
import {
  AppContainer,
  Disclaimer,
  BitcoinPrice,
  ChartTitle,
  CenterContainer,
  ChartSubTitle
} from './Layouts'
import Background from './Background'
import Chart from './Chart'
import 'styled-components/macro'

const API = 'https://api.coindesk.com/v1/bpi/historical/close.json'
const transformData = data =>
  Object.entries(data.bpi).map(([date, value]) => ({
    date: new Date(date),
    value
  }))

function App() {
  const { error, loading, data } = useFetch(API)
  const { width = 600, height = 400 } = useWindowSize()
  const chartData = data ? transformData(data) : []
  return (
    <div css="flex-direction:column;">
      <AppContainer>
        <Background width={width} height={height} />
        <CenterContainer>
          <BitcoinPrice>
            <div css="flex-direction: row;justify-items: flex-start;width: 100%;">
              <ChartTitle>Bitcoin Price</ChartTitle>
              <ChartSubTitle>Last 30 Days</ChartSubTitle>
            </div>
            {loading ? (
              <p>loading</p>
            ) : (
              <Chart
                data={chartData}
                width={width}
                height={height}
                margin={{ top: 0, left: 5, bottom: 45, right: 5 }}
              />
            )}
          </BitcoinPrice>
          <Disclaimer>
            Powered by <a href={'https://www.coindesk.com/price/'}>CoinDesk</a>
          </Disclaimer>
        </CenterContainer>{' '}
      </AppContainer>{' '}
    </div>
  )
}

export default App
