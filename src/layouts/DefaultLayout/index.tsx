import { Navbar } from 'layouts/DefaultLayout/components/Navbar'
import { Outlet } from 'react-router-dom'
import { useAuthStore } from 'store/auth'

import { Footer } from './components/Footer'
import { Loading } from './components/Loading'

export function DefaultLayout() {
  const isLoading = useAuthStore(state => state.isAuthLoading)

  return (
    <div className="flex h-screen min-h-screen w-full flex-col justify-between bg-background">
      <Navbar />
      <div className="flex h-full w-full max-w-[1400px] flex-col justify-between overflow-y-scroll bg-background pt-4">
        {isLoading ? <Loading /> : <Outlet />}
        <Footer />
      </div>
    </div>
  )
}
