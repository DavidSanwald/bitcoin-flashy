import styled from 'styled-components'

const AppContainer = styled.div`
  background-color: #27273f;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Disclaimer = styled.div`
  margin-top: 35px;
  font-size: 11px;
  color: white;
  opacity: 0.4;
  text-align: center;
  justify-content: center;
  align-content: center;
  justify-items: center;
`
const CenterContainer = styled.div`
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const BitcoinPrice = styled.div`
  background-color: #27273f;
  text-align: left;
  border-radius: 6px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const ChartTitle = styled.h1`
  justify-items: center;
  width: 100%;
  flex: row;
  text-align: left;
  font-size: 1.3rem;
  padding-top: 35px;
  padding-left: 20px;
  font-family: Roboto;
  color: #ff5a5f;
  font-weight: 400;
  opacity: 0.8;
  margin: 0;
`
const ChartSubTitle = styled.h2`
  font-size: 0.8rem;
  padding-left: 20px;
  color: white;
  opacity: 0.3;
  margin-top: 0px;
  text-align: start;
`
const ChartContainer = styled.div`
  display: flex;
  flex: 1;
`
export {
  CenterContainer,
  AppContainer,
  Disclaimer,
  BitcoinPrice,
  ChartContainer,
  ChartTitle,
  ChartSubTitle
}
