import { onValue, ref } from 'firebase/database'
import { database } from 'lib/firebase'
import { useAuthStore } from 'store/auth'

import { Game } from './components/Game'

export function PlinkoGamePage() {
  const setCurrentBalance = useAuthStore(state => state.setBalance)
  const isAuth = useAuthStore(state => state.isAuth)
  const user = useAuthStore(state => state.user)
  const walletRef = ref(database, 'wallet/' + user.id)
  onValue(walletRef, snapshot => {
    if (snapshot.exists()) {
      const data = snapshot.val()
      if (data.currentBalance && isAuth) {
        setCurrentBalance(data.currentBalance)
      }
    }
    return null
  })
  return <Game />
}
