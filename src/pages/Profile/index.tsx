import classNames from 'classnames'
import { Crown, FinnTheHuman } from 'phosphor-react'
import { useAuthStore } from 'store/auth'
import { formatPoints } from 'utils/currencyFormat'

interface User {
  name: string
  profilePic: string
  uid: string
  currentBalance: number
  position: number
}

export function Profile(user: User) {
  const authUser = useAuthStore(state => state.user)
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-primary p-2 px-6 text-text">
      <div className="relative mx-auto w-32 rounded-full">
        {user.profilePic ? (
          <img
            src={user.profilePic}
            referrerPolicy="no-referrer"
            alt={user.name + ' Avatar'}
            className="w-full rounded-full"
          />
        ) : (
          <FinnTheHuman size="full" weight="fill" />
        )}
        {user.position <= 2 && (
          <Crown
            className={classNames(
              'absolute -right-2 bottom-0 transition-colors',
              {
                'text-yellow-400': user.position === 0,
                'text-gray-300': user.position === 1,
                'text-yellow-800': user.position === 2
              }
            )}
            weight="fill"
            size="40"
          />
        )}
      </div>
      <span
        className={classNames('text-center text-2xl font-bold', {
          'text-purple': user.uid === authUser.id
        })}
      >
        {user.name || 'Jogador Anônimo'} {user.uid === authUser.id && '(você)'}
      </span>
      <span className="text-center text-xl font-bold">
        {formatPoints(user.currentBalance)} PPs
      </span>
    </div>
  )
}
