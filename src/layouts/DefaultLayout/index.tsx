import { onValue, ref } from 'firebase/database'
import { Navbar } from 'layouts/DefaultLayout/components/Navbar'
import { database } from 'lib/firebase'
import { Outlet } from 'react-router-dom'
import { useAuthStore } from 'store/auth'

import { Footer } from './components/Footer'
import { Loading } from './components/Loading'

export function DefaultLayout() {
  const isLoading = useAuthStore(state => state.isAuthLoading)
  const setCurrentBalance = useAuthStore(state => state.setBalance)
  const setBalanceOnDatabase = useAuthStore(state => state.setBalanceOnDatabase)
  const isAuth = useAuthStore(state => state.isAuth)
  const user = useAuthStore(state => state.user)
  const walletRef = ref(database, 'wallet/' + user.id)

  onValue(walletRef, async snapshot => {
    if (snapshot.exists()) {
      const data = snapshot.val()
      if (data && isAuth) {
        console.log(data)
        setCurrentBalance(data.currentBalance)
        return
      }
      return
    }
    await setBalanceOnDatabase(100)
  })

  return (
    <div className="flex min-h-screen w-full flex-col justify-between bg-background">
      <Navbar />
      <div className="flex h-full w-full max-w-[1400px] flex-1 overflow-auto overflow-x-hidden pt-4 lg:mx-auto">
        <div className="flex-1">{isLoading ? <Loading /> : <Outlet />}</div>
      </div>
      <Footer />
    </div>
  )
}
