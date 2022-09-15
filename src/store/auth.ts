import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { ref, set } from 'firebase/database'
import { produce } from 'immer'
import { auth, database } from 'lib/firebase'
import create from 'zustand'

interface User {
  id: string
  name: string
  email: string
  profilePic?: string
}

interface Wallet {
  balance: number
}

interface State {
  user: User
  wallet: Wallet
  isAuth: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  setUser: (user: User) => void
  isAuthLoading: boolean
  isWalletLoading: boolean
  setBalance: (balance: number) => Promise<void>
  incrementBalance: (amount: number) => Promise<void>
  decrementBalance: (amount: number) => Promise<void>
}

function storeUser(user: User) {
  localStorage.setItem('uid', user.id)
  localStorage.setItem('name', user.name)
  localStorage.setItem('profilePic', user.profilePic || '')
}

function clearUser() {
  localStorage.removeItem('uid')
  localStorage.removeItem('name')
  localStorage.removeItem('profilePic')
}

const userInitialState: User = {
  id: '',
  name: '',
  email: ''
}

const walletInitialState: Wallet = {
  balance: 0
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
    currentBalance: walletInitialState.balance,
    user: {
      uid,
      name: localStorage.getItem('name'),
      profilePic: localStorage.getItem('profilePic')
    }
  })
}

export const useAuthStore = create<State>((set, getState) => ({
  user: userInitialState,
  wallet: walletInitialState,
  isAuthLoading: false,
  isWalletLoading: false,
  isAuth: false,
  setBalance: async (balance: number) => {
    try {
      set(state => ({ ...state, isWalletLoading: true }))
      if (balance === getState().wallet.balance) {
        set(state => ({ ...state, isWalletLoading: false }))
        return
      }
      await updateCurrentBalanceOnDatabase(balance)
      set(
        produce<State>(state => {
          state.wallet.balance = balance
          state.isWalletLoading = false
        })
      )
    } catch (error) {
      console.error('setBalanceError', error)
    }
  },
  incrementBalance: async (amount: number) => {
    try {
      set(state => ({ ...state, isWalletLoading: true }))
      await updateCurrentBalanceOnDatabase(getState().wallet.balance + amount)
      set(
        produce<State>(state => {
          state.wallet.balance += amount
          state.isWalletLoading = false
        })
      )
    } catch (error) {
      console.error('incrementBalanceError', error)
    }
  },
  decrementBalance: async (amount: number) => {
    try {
      set(state => ({ ...state, isWalletLoading: true }))
      await updateCurrentBalanceOnDatabase(getState().wallet.balance - amount)
      set(
        produce<State>(state => {
          state.wallet.balance -= amount
          state.isWalletLoading = false
        })
      )
    } catch (error) {
      console.error('decrementBalanceError', error)
    }
  },
  signIn: async () => {
    try {
      set(state => ({ ...state, isAuthLoading: true }))
      const provider = new GoogleAuthProvider()
      const { user } = await signInWithPopup(auth, provider)
      const { uid: id, displayName: name, photoURL: profilePic, email } = user
      if (name && email) {
        const newUser = { id, name, email, profilePic: profilePic || '' }
        storeUser(newUser)
        set(
          produce<State>(state => {
            state.user = newUser
            state.isAuth = true
            state.isAuthLoading = false
          })
        )
      }
      set(state => ({ ...state, isLoading: false }))
    } catch (error) {
      console.error('signInError', error)
    }
  },
  signOut: async () => {
    try {
      set(state => ({ ...state, isAuthLoading: true }))
      await auth.signOut()
      clearUser()
      set(
        produce<State>(state => {
          state.user = userInitialState
          state.isAuth = false
          state.isAuthLoading = false
        })
      )
    } catch (error) {
      console.error('signOutError', error)
    }
  },
  setUser: (user: User) => {
    try {
      set(state => ({ ...state, isAuthLoading: true }))
      set(
        produce<State>(state => {
          state.user = user
          state.isAuth = true
          state.isAuthLoading = false
        })
      )
    } catch (error) {
      console.error('setUserError', error)
    }
  }
}))
