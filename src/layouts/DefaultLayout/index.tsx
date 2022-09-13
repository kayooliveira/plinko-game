import { Navbar } from 'layouts/DefaultLayout/components/Navbar'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useAuth } from 'redux/slicers/sliceAuth'

import { Footer } from './components/Footer'
import { Loading } from './components/Loading'

export function DefaultLayout() {
  const { isLoading } = useSelector(useAuth)

  return (
    <div className="flex h-screen max-h-screen w-full flex-col justify-between bg-background">
      <Navbar />
      <div className="flex h-full flex-col justify-between pt-2">
        <div className="h-full max-w-[1400px]">
          {isLoading ? <Loading /> : <Outlet />}
        </div>
        <Footer />
      </div>
    </div>
  )
}
