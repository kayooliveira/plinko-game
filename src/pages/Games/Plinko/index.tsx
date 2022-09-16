import { useEffect } from 'react'
import { useGameStore } from 'store/game'

import { Game } from './components/Game'

export function PlinkoGamePage() {
  const alertUser = (e: BeforeUnloadEvent) => {
    if (gamesRunning > 0) {
      e.preventDefault()
      alert('Tu quer mermo sair feladaputa?')
      e.returnValue = ''
    }
  }
  const gamesRunning = useGameStore(state => state.gamesRunning)
  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    return () => {
      window.removeEventListener('beforeunload', alertUser)
    }
  }, [gamesRunning])
  return <Game />
}
