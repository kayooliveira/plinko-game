import create from 'zustand'

interface Game {
  gamesRunning: number
  setGamesRunning: (gamesRunning: number) => void
  incrementGamesRunning: () => void
  decrementGamesRunning: () => void
}

export const useGameStore = create<Game>(set => ({
  gamesRunning: 0,
  setGamesRunning: (gamesRunning: number) => {
    set({ gamesRunning })
  },
  incrementGamesRunning: () => {
    set(state => ({ gamesRunning: state.gamesRunning + 1 }))
  },
  decrementGamesRunning: () => {
    set(state => ({ gamesRunning: state.gamesRunning - 1 }))
  }
}))
