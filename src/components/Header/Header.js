import React, {useContext} from 'react';
import styled from 'styled-components'

import Container from '../Container'
import Logo from '../Logo'
import {ClaimRewards} from './ClaimRewards.js';
import DashboardContext from '../../views/Dashboard/context.js';

const StyledHeader = styled.div`
  align-items: center;
  display: flex;
  padding: 40px 0;
  justify-content: space-between;
  @media screen and (max-width: 600px) {
    flex-wrap: wrap;
  }
`

const StyledHeaderLink = styled.a`
  color: #ac0cee;
  text-decoration: none;
  font-size: 20px;
  margin-right: 20px;
  margin-left: auto;
  &:hover {
    text-decoration: underline;
  }
`

const Header = () => {
  const {engine} = useContext(DashboardContext)
  return (
    <Container>
      <StyledHeader>
        <Logo />
        <StyledHeaderLink href="https://docs.component.finance/" target="_blank">Docs</StyledHeaderLink>
        {engine && engine.rewards.amount && !engine.rewards.isClaimed && <ClaimRewards />}
      </StyledHeader>
    </Container>
  )
}

export default Header
