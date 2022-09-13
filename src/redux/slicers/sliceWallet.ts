// eslint-disable-next-line import/named
import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { child, get, ref, set } from 'firebase/database'
import { database } from 'lib/firebase'
import { formatPoints } from 'utils/currencyFormat'

interface Wallet {
  currentBalance: number
  currentBalanceFormatted: string
  isLoading?: boolean
}

const INITIAL_STATE: Wallet = {
  currentBalance: 100,
  currentBalanceFormatted: formatPoints(100),
  isLoading: false
}

const EMPTY_STATE: Wallet = {
  currentBalance: 0,
  currentBalanceFormatted: formatPoints(0),
  isLoading: true
}

async function updateCurrentBalanceOnDatabase(balance: number) {
  const uid = localStorage.getItem('uid')
  const walletRef = ref(database, 'wallet/' + uid)
  await set(walletRef, {
    currentBalance: balance,
    user: {
      uid,
      name: localStorage.getItem('name'),
      profilePic: localStorage.getItem('profilePic')
    }
  })
}

export async function setFirstBalanceOnDatabase(uid: string) {
  const walletRef = ref(database, 'wallet/' + uid)
  await set(walletRef, {
    currentBalance: INITIAL_STATE.currentBalance,
    user: {
      uid,
      name: localStorage.getItem('name'),
      profilePic: localStorage.getItem('profilePic')
    }
  })
}

export const getCurrentBalanceFromDb: any = createAsyncThunk(
  'auth/getCurrentBalanceFromDb',
  async (uid: string) => {
    if (uid) {
      const snapshot = await get(child(ref(database), `wallet/${uid}`))
      const data = snapshot.val()
      if (!data) {
        setFirstBalanceOnDatabase(uid)
        return INITIAL_STATE
      }
      return data
    }
    return INITIAL_STATE
  }
)

const sliceWallet = createSlice({
  name: 'wallet',
  initialState: INITIAL_STATE,
  reducers: {
    resetCurrentBalance() {
      updateCurrentBalanceOnDatabase(0)
      return { ...EMPTY_STATE, isLoading: false }
    },
    zeroCurrentBalance() {
      updateCurrentBalanceOnDatabase(0)
      return { ...EMPTY_STATE, isLoading: false }
    },
    setCurrentBalance(state, { payload }: PayloadAction<number>) {
      const newWallet: Wallet = {
        currentBalance: payload,
        currentBalanceFormatted: formatPoints(payload),
        isLoading: false
      }
      return { ...state, ...newWallet }
    },
    incrementCurrentBalance(state, { payload }: PayloadAction<number>) {
      if (payload <= 0) return { ...EMPTY_STATE, isLoading: false }

      const newCurrentBalance = state.currentBalance + payload

      if (newCurrentBalance <= 0) {
        updateCurrentBalanceOnDatabase(0)
        return { ...EMPTY_STATE, isLoading: false }
      }
      const newWallet: Wallet = {
        currentBalance: newCurrentBalance,
        currentBalanceFormatted: formatPoints(newCurrentBalance)
      }
      updateCurrentBalanceOnDatabase(newCurrentBalance)
      return { ...state, ...newWallet, isLoading: false }
    },
    decrementCurrentBalance(state, { payload }: PayloadAction<number>) {
      const newCurrentBalance = state.currentBalance - payload
      if (newCurrentBalance <= 0) {
        updateCurrentBalanceOnDatabase(0)
        return { ...EMPTY_STATE, isLoading: false }
      }
      const newWallet: Wallet = {
        currentBalance: newCurrentBalance,
        currentBalanceFormatted: formatPoints(newCurrentBalance)
      }
      updateCurrentBalanceOnDatabase(newCurrentBalance)
      return { ...state, ...newWallet, isLoading: false }
    }
  },
  extraReducers: {
    [getCurrentBalanceFromDb.fulfilled.type]: (
      state,
      { payload }: PayloadAction<Wallet>
    ) => {
      const payloadBalance = payload.currentBalance
      state.isLoading = false
      state.currentBalance = payloadBalance
      state.currentBalanceFormatted = formatPoints(payloadBalance)
    },
    [getCurrentBalanceFromDb.pending.type]: state => {
      state.isLoading = true
    },
    [getCurrentBalanceFromDb.rejected.type]: state => {
      state.isLoading = false
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
