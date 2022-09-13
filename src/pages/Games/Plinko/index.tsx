import { Plinko } from 'components/Plinko'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from 'redux/slicers/sliceAuth'
import { getCurrentBalanceFromDb } from 'redux/slicers/sliceWallet'
export function GamePlinkoPage() {
  const { user, isAuth } = useSelector(useAuth)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isAuth) {
      dispatch(getCurrentBalanceFromDb(user.id))
    }
  }, [isAuth, user.id])

  return <Plinko />
}
