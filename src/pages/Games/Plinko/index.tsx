import { Plinko } from 'components/Plinko'
import { onValue, ref } from 'firebase/database'
import { database } from 'lib/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from 'redux/slicers/sliceAuth'
import { setCurrentBalance } from 'redux/slicers/sliceWallet'
export function GamePlinkoPage() {
  const { user, isAuth } = useSelector(useAuth)
  const dispatch = useDispatch()

  const walletRef = ref(database, 'wallet/' + user.id)

  onValue(walletRef, snapshot => {
    if (snapshot.exists()) {
      const data = snapshot.val()
      if (data.currentBalance && isAuth) {
        dispatch(setCurrentBalance(data.currentBalance))
      }
    }
  })
  return <Plinko />
}
