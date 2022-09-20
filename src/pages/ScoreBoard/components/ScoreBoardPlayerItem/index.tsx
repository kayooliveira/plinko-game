import classNames from 'classnames'
import { User } from 'pages/ScoreBoard/@types/player'
import { Crown, FinnTheHuman } from 'phosphor-react'
import { useAuthStore } from 'store/auth'
import { formatPoints } from 'utils/currencyFormat'

interface ScoreBoardPlayerItemProps {
  player: User
  position: number
  onClick: () => void
}

export function ScoreBoardPlayerItem({
  player,
  position,
  onClick
}: ScoreBoardPlayerItemProps) {
  const user = useAuthStore(state => state.user)
  return (
    <button
      onClick={onClick}
      className={classNames(
        'group relative flex items-center justify-between gap-4 rounded-md p-1 px-2 hover:bg-secondary/80',
        {
          'bg-secondary/60': player.uid === user.id,
          'bg-secondary/20': player.uid !== user.id
        }
      )}
      key={player.uid + player.name}
    >
      {position <= 2 && (
        <Crown
          className={classNames(
            'absolute -right-1 bottom-0 transition-colors',
            {
              'text-yellow-400': position === 0,
              'text-gray-300': position === 1,
              'text-yellow-800': position === 2
            }
          )}
          weight="fill"
          size="20"
        />
      )}
      <div
        className={classNames(
          'flex max-w-full flex-1 items-center justify-between gap-4',
          {
            'text-purple': player.uid === user.id,
            'text-text': player.uid !== user.id
          }
        )}
      >
        <span className=" max-w-[15ch] overflow-hidden truncate text-left group-hover:text-transparent lg:w-[15ch] lg:max-w-[15ch]">
          {player.uid === user.id ? (
            <strong>Você</strong>
          ) : (
            player.name || 'Jogador Anônimo'
          )}
        </span>
        <span className="absolute left-1/3 hidden animate-pulse text-text group-hover:block">
          Clique para ir ao perfil
        </span>
        <strong
          className="text-right text-sm transition-colors group-hover:text-transparent lg:w-[10ch]  lg:max-w-[10ch] lg:text-lg"
          title={String(player.currentBalance)}
        >
          {formatPoints(player.currentBalance)}
        </strong>
      </div>
      {player.profilePic ? (
        <img
          src={player.profilePic}
          referrerPolicy="no-referrer"
          alt={player.name + ' Avatar'}
          className="w-8 rounded-full group-hover:text-transparent"
        />
      ) : (
        <FinnTheHuman size="30" weight="fill" />
      )}
    </button>
  )
}
