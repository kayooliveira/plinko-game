import plinkoLogo from '@images/logo.svg'
import classNames from 'classnames'
import { SignOut } from 'phosphor-react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout, useAuth } from 'redux/slicers/sliceAuth'
import { useWallet } from 'redux/slicers/sliceWallet'

import { WalletCard } from '../WalletCard'

export function Navbar() {
  const { currentBalance } = useSelector(useWallet)
  const { isAuth } = useSelector(useAuth)
  const dispatch = useDispatch()
  function handleSignOut() {
    dispatch(logout())
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
