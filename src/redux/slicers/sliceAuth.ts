/* eslint-disable import/named */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User as AuthUser
} from 'firebase/auth'
import { auth } from 'lib/firebase'

interface User {
  id: string
  name: string
  email: string
  profilePic?: string
}

interface Auth {
  user: User
  isAuth: boolean
  isLoading: boolean
}

const INITIAL_STATE: Auth = {
  user: {
    id: '',
    name: '',
    email: ''
  },
  isAuth: false,
  isLoading: false
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

export const signIn = createAsyncThunk('auth/signIn', async () => {
  const provider = new GoogleAuthProvider()
  const { user } = await signInWithPopup(auth, provider)
  return user
})

export const refreshAuth = createAsyncThunk('auth/refreshAuth', async () => {
  const user = await new Promise<AuthUser | null>(resolve => {
    onAuthStateChanged(auth, user => {
      if (user) {
        resolve(user)
      }
    })
  })
  return user
})

const sliceAuth = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    logout(state) {
      auth.signOut()
      clearUser()
      return {
        ...state,
        ...INITIAL_STATE
      }
    }
  },
  extraReducers: {
    [signIn.fulfilled.type]: (state, { payload }: PayloadAction<AuthUser>) => {
      const {
        uid: id,
        displayName: name,
        photoURL: profilePic,
        email
      } = payload
      if (name && email) {
        state.user = { id, name, email, profilePic: profilePic || '' }
        state.isAuth = true
        storeUser(state.user)
      }
      state.isLoading = false
    },
    [refreshAuth.fulfilled.type]: (
      state,
      { payload }: PayloadAction<AuthUser | null>
    ) => {
      if (payload) {
        const {
          uid: id,
          displayName: name,
          photoURL: profilePic,
          email
        } = payload
        if (name && email) {
          state.user = { id, name, email, profilePic: profilePic || '' }
          state.isAuth = true
          storeUser(state.user)
        }
      }
      state.isLoading = false
    }
  }
})

export default sliceAuth.reducer

export const { logout } = sliceAuth.actions

export const useAuth = (state: any) => {
  return state.auth as Auth
}
