import { GoogleLogo } from 'phosphor-react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { refreshAuth, signIn, useAuth } from 'redux/slicers/sliceAuth'

type LocationState = {
  from?: string
}

export function LoginPage() {
  const location = useLocation()
  const state = location.state as LocationState
  const navigate = useNavigate()
  const { isAuth, user } = useSelector(useAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isAuth && !user.id) {
      dispatch<any>(refreshAuth())
    } else if (state?.from && isAuth) {
      navigate(state?.from || '/')
    } else if (isAuth && user.id) {
      navigate('/')
    }
  }, [isAuth, user])

  function handleSignIn() {
    dispatch<any>(signIn())
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <span className="text-center text-2xl font-bold text-text">
        Faça login para mostrar seu score para outros jogadores.
      </span>
      <button
        onClick={handleSignIn}
        className="flex items-center gap-2 rounded-md bg-red-500 px-6 py-4 font-bold text-text shadow-sm transition-colors hover:bg-red-700"
      >
        <GoogleLogo size="20" weight="fill" />
        Login com o Google
      </button>
    </div>
  )
}
