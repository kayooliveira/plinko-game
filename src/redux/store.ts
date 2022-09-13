import { configureStore } from '@reduxjs/toolkit'

import sliceAuth from './slicers/sliceAuth'
import sliceWallet from './slicers/sliceWallet'

const store = configureStore({
  reducer: {
    wallet: sliceWallet,
    auth: sliceAuth
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export default store
