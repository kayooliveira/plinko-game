import { get, ref } from 'firebase/database'
import { database } from 'lib/firebase'
import { FinnTheHuman, Play } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAuth } from 'redux/slicers/sliceAuth'
import { formatPoints } from 'utils/currencyFormat'

interface ScoreBoard {
  currentBalance: number
  user: {
    name: string
    profilePic: string
    uid: string
  }
}

export function ScoreBoardPage() {
  const dbRef = ref(database, 'wallet')
  const { user } = useSelector(useAuth)

  const [scoreBoard, setScoreBoard] = useState<ScoreBoard[]>([])

  async function getScoreBoardData() {
    const snapshot = await get(dbRef)
    const data = Object.values(snapshot.val()) as unknown as ScoreBoard[]
    setScoreBoard(data)
  }

  useEffect(() => {
    getScoreBoardData()
  }, [])

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="flex w-4/5 flex-col gap-3 rounded bg-primary p-4 text-text">
        <span className="text-center text-2xl font-bold">
          Melhores Pontuações
        </span>
        <div className="flex flex-col gap-2">
          {scoreBoard.map(score => (
            <div
              className="flex items-center justify-between gap-4 rounded-md bg-secondary p-1 px-2"
              key={score.currentBalance + score.user.name}
            >
              <div className="flex flex-1 items-center justify-between">
                <span className="max-w-[15ch] overflow-hidden truncate">
                  {score.user.uid === user.id ? 'Você' : score.user.name}
                </span>
                <strong>{formatPoints(score.currentBalance)} PPs</strong>
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
            </div>
          ))}
        </div>
      </div>

      <Link
        to="/plinko"
        className="flex items-center justify-center gap-4 rounded-lg bg-purpleDark p-4 text-lg font-bold text-text shadow-md transition-colors hover:bg-purple"
      >
        <Play weight="fill" size="20" />
        JOGAR
      </Link>
    </div>
  )
}
