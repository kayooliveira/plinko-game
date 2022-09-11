// eslint-disable-next-line import/named
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { formatPoints } from 'utils/currencyFormat'

interface Wallet {
  currentBalance: number
  currentBalanceFormatted: string
}

const INITIAL_STATE: Wallet = {
  currentBalance: 100,
  currentBalanceFormatted: formatPoints(100)
}

const EMPTY_STATE: Wallet = {
  currentBalance: 0,
  currentBalanceFormatted: formatPoints(0)
}

const sliceWallet = createSlice({
  name: 'wallet',
  initialState: INITIAL_STATE,
  reducers: {
    resetCurrentBalance(state) {
      return {
        ...state,
        ...INITIAL_STATE
      }
    },
    zeroCurrentBalance(state) {
      return {
        ...state,
        ...EMPTY_STATE
      }
    },
    setCurrentBalance(state, { payload }: PayloadAction<number>) {
      const newWallet: Wallet = {
        currentBalance: payload,
        currentBalanceFormatted: formatPoints(payload)
      }
      return { ...state, ...newWallet }
    },
    incrementCurrentBalance(state, { payload }: PayloadAction<number>) {
      if (payload <= 0) return EMPTY_STATE

      const newCurrentBalance = state.currentBalance + payload

      if (newCurrentBalance <= 0) return EMPTY_STATE
      const newWallet: Wallet = {
        currentBalance: newCurrentBalance,
        currentBalanceFormatted: formatPoints(newCurrentBalance)
      }
      return { ...state, ...newWallet }
    },
    decrementCurrentBalance(state, { payload }: PayloadAction<number>) {
      const newCurrentBalance = state.currentBalance - payload
      if (newCurrentBalance <= 0) return EMPTY_STATE
      const newWallet: Wallet = {
        currentBalance: newCurrentBalance,
        currentBalanceFormatted: formatPoints(newCurrentBalance)
      }
      return { ...state, ...newWallet }
    }
  }
})

export default sliceWallet.reducer

export const {
  decrementCurrentBalance,
  incrementCurrentBalance,
  setCurrentBalance,
  resetCurrentBalance,
  zeroCurrentBalance
} = sliceWallet.actions

export const useWallet = (state: any) => {
  return state.wallet as Wallet
}
