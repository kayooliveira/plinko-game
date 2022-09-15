import plinkoLogo from '@images/logo.svg'
import classNames from 'classnames'
import { SignOut } from 'phosphor-react'
import { Link } from 'react-router-dom'
import { useAuthStore } from 'store/auth'

import { WalletCard } from '../WalletCard'

export function Navbar() {
  const currentBalance = useAuthStore(state => state.wallet.balance)
  const isAuth = useAuthStore(state => state.isAuth)
  const signOut = useAuthStore(state => state.signOut)

  async function handleSignOut() {
    await signOut()
  }

  return (
    <nav className="sticky top-0 z-50 bg-primary px-4 shadow-lg">
      <div
        className={classNames(
          'mx-auto flex h-16 w-full max-w-[1400px] items-center',
          {
            'justify-between': isAuth,
            'justify-center': !isAuth
          }
        )}
      >
        <Link to="/">
          <img src={plinkoLogo} alt="" className="w-32 md:w-40" />
        </Link>
        {isAuth && (
          <div className="flex items-stretch gap-4">
            <WalletCard balance={currentBalance} showFormatted />
            <button
              title="Sair"
              onClick={handleSignOut}
              className="rounded-md bg-purpleDark px-4 text-text hover:bg-purple"
            >
              <SignOut weight="bold" />
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
