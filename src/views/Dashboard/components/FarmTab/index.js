import React, {useContext, useEffect, useState} from 'react';
import {TabActions, TabContainer, TabHeading} from '../../../../components/TabContainer/styled.js';
import DashboardContext from '../../context.js';
import Button from '../../../../components/Button';
import {FarmTabWithdrawModal} from './FarmTabWithdrawModal';
import {FarmTabDepositModal} from './FarmTabDepositModal';
import Spinner from '../../../../components/Spiner/Spinner.js';
import styled from 'styled-components';

export function FarmTab({farmAddress, type}) {
  const [loading, setLoading] = useState(true)
  const [farm, setFarm] = useState(null)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [showDepositModal, setShowDepositModal] = useState(false)
  const [showClaimModal, setShowClaimModal] = useState(false)

  const {
    state,
    loggedIn,
    selectWallet,
  } = useContext(DashboardContext)

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const address = farmAddress || queryParams.get('address')
    if (address && state.get('farming') && state.get('farming')[type]) setFarm(state.get('farming')[type][address]);
    setLoading(false)
  }, [state, farmAddress])

  const test = styled.div`
    display: flex;
    flex-wrap: wrap;
    p {
      display: block;
      width: 50%;
    }
  `

  return (
    <TabContainer>
      {loading ? <Spinner /> : farm ? (
        <>
          {showWithdrawModal && <FarmTabWithdrawModal onDismiss={() => setShowWithdrawModal(false)} farm={farm} />}
          {showDepositModal && <FarmTabDepositModal onDismiss={() => setShowDepositModal(false)} farm={farm} />}
          <TabHeading>{farm.name} <span>(APR: {farm.apr}%)</span></TabHeading>
          <div>
            <p>TVL: {farm.totalLockedValue.display}</p>
            <p>Deposited: {farm.userLockedValue.display}</p>
            <p>Available to deposit: {farm.underlyingBalance.display}</p>
            <p>Claimable: {farm.CMPEarned.display}</p>
          </div>
          <TabActions>
            {loggedIn &&
              <Button
                fullWidth
                onClick={() => setShowDepositModal(true)}
              >
                Deposit
              </Button>
            }
            {loggedIn && farm.CMPEarned.numeraire.gt(0) &&
                <Button
                  fullWidth
                  onClick={() => farm.claim()}
                >Claim</Button>
              }
            {loggedIn && farm.userLockedValue?.numeraire.gt(0) &&
                <Button
                  outlined
                  fullWidth
                  onClick={() => setShowWithdrawModal(true)}
                >Withdraw</Button>
              }
            {!loggedIn && <Button onClick={selectWallet} fullWidth>Connect</Button>}
          </TabActions>
        </>
      ) : (
        <TabHeading>Unknown farm address</TabHeading>
      )}
    </TabContainer>
  )
}
