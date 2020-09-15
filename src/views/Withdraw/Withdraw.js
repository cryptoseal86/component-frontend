import React, { useContext, useState } from 'react'

import { fromJS } from 'immutable'

import ModalConfirmMetamask from '../../components/ModalConfirmMetamask'
import WithdrawingModal from '../../components/ModalAwaitingTx'

import DashboardContext from '../Dashboard/context'

import ModalError from '../../components/ModalError'
import StartModal from './components/StartModal'
import ModalSuccess from '../../components/ModalSuccess'

const Withdraw = ({
  onDismiss
}) => {
  const { 
    engine,
    state
  } = useContext(DashboardContext)

  const [txHash, setTxHash] = useState('')
  const [step, setStep] = useState('start')
  const [localState, setLocalState] = useState(fromJS({
    assets: new Array(engine.assets.length).fill({
      error: '',
      input: ''
    }),
    error: '',
    feeTip: 'Your rate on this withdrawal will be...',
    proportional: false
  }))

  const handleTxHash = (hash) => ( setStep('withdrawing'), setTxHash(hash) )

  const handleConfirmation = () => setStep('success')

  const handleError = () => setStep('error')

  const handleProportionalWithdraw = async (amount) => {

    setStep('confirmingMetamask')

    engine.proportionalWithdraw(
      amount,
      handleTxHash,
      handleConfirmation,
      handleError
    )

  }

  const handleWithdraw = async (addresses, amounts) => {

    setStep('confirmingMetamask')

    engine.selectiveWithdraw(
      addresses,
      amounts,
      handleTxHash,
      handleConfirmation,
      handleError
    )

  }

  return (
    <>
      {step === 'start' && (
        <StartModal
          engine={engine}
          localState={localState}
          onDismiss={onDismiss}
          onProportionalWithdraw={handleProportionalWithdraw}
          onWithdraw={handleWithdraw}
          setLocalState={setLocalState}
          state={state}
        />
      )}

      {step === 'confirmingMetamask' && (
        <ModalConfirmMetamask />
      )}

      {step === 'withdrawing' && (
        <WithdrawingModal />
      )}

      {step === 'success' && (
        <ModalSuccess buttonBlurb={'Finish'} onDismiss={onDismiss} title={'Withdrawal Successful.'} />
      )}

      {step === 'error' && (
        <ModalError buttonBlurb={'Finish'} onDismiss={onDismiss} title={'An error occurred.'} />
      )}

    </>
  )
}

export default Withdraw