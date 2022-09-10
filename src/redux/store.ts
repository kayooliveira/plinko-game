import { configureStore } from '@reduxjs/toolkit'

import sliceWallet from './slicers/sliceWallet'

const store = configureStore({
  reducer: {
    wallet: sliceWallet
  }
})

export default store
