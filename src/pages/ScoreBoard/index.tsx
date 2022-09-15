import classNames from 'classnames'
import { get, ref } from 'firebase/database'
import { database } from 'lib/firebase'
import { Profile } from 'pages/Profile'
import { ArrowLeft, FinnTheHuman, Play } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from 'store/auth'
import { formatPoints } from 'utils/currencyFormat'

interface ScoreBoard {
  currentBalance: number
  user: {
    name: string
    profilePic: string
    uid: string
  }
}

interface User {
  name: string
  profilePic: string
  uid: string
  currentBalance: number
}

export function ScoreBoardPage() {
  const dbRef = ref(database, 'wallet')
  const user = useAuthStore(state => state.user)
  const [scoreBoard, setScoreBoard] = useState<ScoreBoard[]>([])
  const [userProfile, setUserProfile] = useState<User | undefined>(undefined)
  async function getScoreBoardData() {
    const snapshot = await get(dbRef)
    const data = Object.values(snapshot.val()) as unknown as ScoreBoard[]
    const sortedData = data
      .sort((a, b) => b.currentBalance - a.currentBalance)
      .slice(0, 10)
    setScoreBoard(sortedData)
  }

  useEffect(() => {
    getScoreBoardData()
  }, [])

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="flex w-4/5 flex-col gap-3 rounded bg-primary p-4 text-text">
        <div className="rounded-md bg-background p-1 text-center text-2xl">
          <strong>TOP 10</strong>
          <br /> Melhores Jogadores
          <br />
          <span className="text-xs">
            clique em um jogador para ver o perfil
          </span>
        </div>
        {userProfile ? (
          <div className="mx-auto flex w-full  flex-col items-center justify-center">
            <Profile {...userProfile} />
            <button
              onClick={() => setUserProfile(undefined)}
              className="rounded-full bg-background p-2 text-text"
            >
              <ArrowLeft weight="fill" />
            </button>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-2 lg:mx-auto lg:w-4/5">
            {scoreBoard.map(score => (
              <button
                onClick={() =>
                  setUserProfile({
                    ...score.user,
                    currentBalance: score.currentBalance
                  })
                }
                className={classNames(
                  'flex items-center justify-between gap-4 rounded-md p-1 px-2',
                  {
                    'bg-secondary/60': score.user.uid === user.id,
                    'bg-secondary/20': score.user.uid !== user.id
                  }
                )}
                key={score.user.uid + score.user.name}
              >
                <div
                  className={classNames(
                    'flex flex-1 items-center justify-between gap-4',
                    {
                      'text-purple': score.user.uid === user.id,
                      'text-text': score.user.uid !== user.id
                    }
                  )}
                >
                  <span className="max-w-[15ch] overflow-hidden truncate">
                    {score.user.uid === user.id ? (
                      <strong>Você</strong>
                    ) : (
                      score.user.name
                    )}
                  </span>
                  <strong
                    className="text-sm lg:text-lg"
                    title={String(score.currentBalance)}
                  >
                    {formatPoints(score.currentBalance)}
                  </strong>
                </div>
                {score.user.profilePic ? (
                  <img
                    src={score.user.profilePic}
                    referrerPolicy="no-referrer"
                    alt={score.user.name + ' Avatar'}
                    className="w-8 rounded-full"
                  />
                ) : (
                  <FinnTheHuman size="30" weight="fill" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      <Link
        to="/plinko"
        className="mb-4 flex items-center justify-center gap-4 rounded-lg bg-purpleDark p-4 text-lg font-bold text-text shadow-md transition-colors hover:bg-purple"
      >
        <Play weight="fill" size="20" />
        JOGAR
      </Link>
    </div>
  )
}
