import create from 'zustand'

interface Game {
  gamesRunning: number
  setGamesRunning: (gamesRunning: number) => void
  incrementGamesRunning: () => void
  decrementGamesRunning: () => void
}

export const useGameStore = create<Game>((set, get) => ({
  gamesRunning: 0,
  setGamesRunning: (gamesRunning: number) => {
    set({ gamesRunning })
  },
  incrementGamesRunning: () => {
    const gamesRunning = get().gamesRunning
    const calc = gamesRunning + 1

    set({ gamesRunning: calc < 0 ? 1 : calc })
  },
  decrementGamesRunning: () => {
    const gamesRunning = get().gamesRunning
    const calc = gamesRunning - 1

    set({ gamesRunning: calc < 0 ? 0 : calc })
  }
}))
