// eslint-disable-next-line import/named
import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { child, get, ref, set } from 'firebase/database'
import { database } from 'lib/firebase'
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
    console.log('uidGetCurrentBalanceFromDb', uid)
    if (uid) {
      const snapshot = await get(child(ref(database), `wallet/${uid}`))
      const data = snapshot.val()
      if (!data) {
        setFirstBalanceOnDatabase(uid)
        return INITIAL_STATE
      }
      console.log('dataGetCurrentBalanceFromDb', data)
      return data
    }
    return INITIAL_STATE
  }
)

const sliceWallet = createSlice({
  name: 'wallet',
  initialState: INITIAL_STATE,
  reducers: {
    resetCurrentBalance(state) {
      updateCurrentBalanceOnDatabase(0)
      return {
        ...state,
        ...INITIAL_STATE
      }
    },
    zeroCurrentBalance(state) {
      updateCurrentBalanceOnDatabase(0)
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

      if (newCurrentBalance <= 0) {
        updateCurrentBalanceOnDatabase(0)
        return EMPTY_STATE
      }
      const newWallet: Wallet = {
        currentBalance: newCurrentBalance,
        currentBalanceFormatted: formatPoints(newCurrentBalance)
      }
      updateCurrentBalanceOnDatabase(newCurrentBalance)
      return { ...state, ...newWallet }
    },
    decrementCurrentBalance(state, { payload }: PayloadAction<number>) {
      const newCurrentBalance = state.currentBalance - payload
      if (newCurrentBalance <= 0) {
        updateCurrentBalanceOnDatabase(0)
        return EMPTY_STATE
      }
      const newWallet: Wallet = {
        currentBalance: newCurrentBalance,
        currentBalanceFormatted: formatPoints(newCurrentBalance)
      }
      updateCurrentBalanceOnDatabase(newCurrentBalance)
      return { ...state, ...newWallet }
    }
  },
  extraReducers: {
    [getCurrentBalanceFromDb.fulfilled.type]: (
      state,
      { payload }: PayloadAction<Wallet>
    ) => {
      const payloadBalance = payload.currentBalance
      state.currentBalance = payloadBalance
      state.currentBalanceFormatted = formatPoints(payloadBalance)
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
