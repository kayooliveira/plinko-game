import { Navbar } from 'layouts/DefaultLayout/components/Navbar'
import { Outlet } from 'react-router-dom'

import { Footer } from './components/Footer'

export function DefaultLayout() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col justify-between bg-background">
      <Navbar />
      <div className="flex flex-1 flex-col justify-between pt-2">
        <div className="mx-auto max-w-[1400px]">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  )
}
