import { Navbar } from 'layouts/DefaultLayout/components/Navbar'
import { Outlet } from 'react-router-dom'
import { useAuthStore } from 'store/auth'

import { Footer } from './components/Footer'
import { Loading } from './components/Loading'

export function DefaultLayout() {
  const isLoading = useAuthStore(state => state.isAuthLoading)

  return (
    <div className="flex h-screen max-h-screen w-full flex-col justify-between bg-background">
      <Navbar />
      <div className="flex h-full flex-col items-center justify-between pt-2">
        <div className="h-full w-full max-w-[1400px] bg-background">
          {isLoading ? <Loading /> : <Outlet />}
        </div>
        <Footer />
      </div>
    </div>
  )
}
