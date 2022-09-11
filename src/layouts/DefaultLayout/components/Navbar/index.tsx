import plinkoLogo from '@images/logo.svg'

import { WalletCard } from '../WalletCard'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50  bg-primary px-4 shadow-lg">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between">
        <img src={plinkoLogo} alt="" className="w-32 md:w-40" />
        <WalletCard showFormatted />
      </div>
    </nav>
  )
}
