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
  isLoading: false
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
    console.log('getCurrentBalanceFromDbUID', uid)
    if (uid) {
      const snapshot = await get(child(ref(database), `wallet/${uid}`))
      const data = snapshot.val()
      console.log('getCurrentBalanceFromDbData', data)
      if (!data) {
        await setFirstBalanceOnDatabase(uid)
        return INITIAL_STATE
      }
      return data
    }
    return EMPTY_STATE
  }
)

const sliceWallet = createSlice({
  name: 'wallet',
  initialState: EMPTY_STATE,
  reducers: {
    resetCurrentBalance(state) {
      updateCurrentBalanceOnDatabase(0)
      state.currentBalance = 0
      state.currentBalanceFormatted = formatPoints(0)
      state.isLoading = false
    },
    zeroCurrentBalance(state) {
      updateCurrentBalanceOnDatabase(0)
      state.currentBalance = 0
      state.currentBalanceFormatted = formatPoints(0)
      state.isLoading = false
    },
    setCurrentBalance(state, { payload }: PayloadAction<number>) {
      state.currentBalance = payload
      state.currentBalanceFormatted = formatPoints(payload)
      state.isLoading = false
    },
    incrementCurrentBalance(state, { payload }: PayloadAction<number>) {
      if (payload <= 0) {
        state.currentBalance = 0
        state.currentBalanceFormatted = formatPoints(0)
        state.isLoading = false
        return
      }
      const newCurrentBalance = state.currentBalance + payload

      if (newCurrentBalance <= 0) {
        updateCurrentBalanceOnDatabase(0)
        state.currentBalance = 0
        state.currentBalanceFormatted = formatPoints(0)
        state.isLoading = false
        return
      }
      state.currentBalance = newCurrentBalance
      state.currentBalanceFormatted = formatPoints(newCurrentBalance)
      state.isLoading = false
      updateCurrentBalanceOnDatabase(newCurrentBalance)
    },
    decrementCurrentBalance(state, { payload }: PayloadAction<number>) {
      const newCurrentBalance = state.currentBalance - payload
      if (newCurrentBalance <= 0) {
        updateCurrentBalanceOnDatabase(0)
        state.currentBalance = 0
        state.currentBalanceFormatted = formatPoints(0)
        state.isLoading = false
        return
      }
      state.currentBalance = newCurrentBalance
      state.currentBalanceFormatted = formatPoints(newCurrentBalance)
      state.isLoading = false
      updateCurrentBalanceOnDatabase(newCurrentBalance)
    }
  },
  extraReducers: {
    [getCurrentBalanceFromDb.fulfilled.type]: (
      state,
      { payload }: PayloadAction<Wallet>
    ) => {
      if (payload) {
        const payloadBalance = payload.currentBalance
        state.isLoading = false
        state.currentBalance = payloadBalance
        state.currentBalanceFormatted = formatPoints(payloadBalance)
      }
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
