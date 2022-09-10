import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { formatPoints } from 'utils/currencyFormat'

interface Wallet {
  currentBalance: number
  currentBalanceFormatted: string
}

const INITIAL_STATE: Wallet = {
  currentBalance: 1000,
  currentBalanceFormatted: formatPoints(1000)
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

      const newCurrentBalance = payload + state.currentBalance

      if (newCurrentBalance <= 0) return EMPTY_STATE

      return { ...state, currentBalance: newCurrentBalance }
    },
    decrementCurrentBalance(state, { payload }: PayloadAction<number>) {
      const newCurrentBalance = payload - state.currentBalance
      if (newCurrentBalance <= 0) return EMPTY_STATE

      return { ...state, currentBalance: newCurrentBalance }
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
