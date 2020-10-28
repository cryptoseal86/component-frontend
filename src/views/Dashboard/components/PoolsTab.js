import React, { useContext } from 'react'
import styled from 'styled-components'
import { withTheme } from '@material-ui/core/styles'

import Button from '../../../components/Button'
import LabelledValue from '../../../components/LabelledValue'

import Overview from '../../../components/Overview'
import OverviewSection from '../../../components/OverviewSection'
import Row from '../../../components/Row'
import TokenIcon from '../../../components/TokenIcon'

import DashboardContext from '../context'

const StyledPoolTab = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const StyledPoolName = styled.span`
  align-items: center;
  display: flex;
  flex: 1.5;
`

const StyledBalance = styled.div`
  display: flex;
  flex: 1;
  font-size: 22px;
  font-family: Arial;
  justify-content: flex-end;
  text-align: right;
  @media (max-width: 512px) {
    font-size: 18px;
  }
`

const StyledActions = withTheme(styled.div`
  align-items: center;
  background-color: ${props => props.theme.palette.grey[50]};
  display: flex;
  height: 80px;
  padding: 0 24px;
  @media (max-width: 512px) {
    padding: 0 12px;
  }
`)

const StyledRows = styled.div`
  margin-bottom: 12px;
`

const PoolTab = ({ buttonsDisabled }) => {
  
  const {
    presentPool,
    engine,
    state
  } = useContext(DashboardContext)

  const rows = state.has('shells') ? engine.shells.map( (_shell_, ix) => { 

    const shell = state.getIn([ 'shells', ix ])

    const liqTotal = shell.getIn(['shell', 'liquiditiesTotal', 'display'])

    const name = shell.get('assets').map(asset => asset.get('name') + ' | ')
    const weights = _shell_.weights.map(weight => {

      String(weight.multipliedBy(new BigNumber(100)).toString()) + '% '

    })

    return (
      <Row>
        <StyledPoolName>
          <LabelledValue value={name} label={asset.symbol} />
        </StyledPoolName>
        <StyledBalance className="number">
          { liqTotal }
        </StyledBalance>
      </Row>
    )
    
  }) : [] 

  return (
    <StyledPoolTab>
      <Overview>
        <OverviewSection>
          <LabelledValue label="Pool Balance" value={ 555 } />
        </OverviewSection>
        <OverviewSection>
          <LabelledValue label="Your Balance" value={ 666 } />
        </OverviewSection>
      </Overview>
      <StyledRows>
        <Row head>
          <span style={{ flex: 1.5 }}> Token </span>
          <span style={{ flex: 1, textAlign: 'right' }}> Pool Balance </span>
          <span style={{ flex: 1, textAlign: 'right' }}> My Balance </span>
        </Row>
        { rows }
      </StyledRows>
      <StyledActions>
        <Button disabled={!state.has('assets')} onClick={presentDeposit}>Deposit</Button>
        <div style={{ width: 12 }} />
        <Button disabled={!state.has('assets')} outlined onClick={presentWithdraw}>Withdraw</Button>
      </StyledActions>
    </StyledPoolTab>
  )
}

export default PoolTab