import { GoogleLogo } from 'phosphor-react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from 'store/auth'

type LocationState = {
  from?: string
}

export function LoginPage() {
  const location = useLocation()
  const state = location.state as LocationState
  const navigate = useNavigate()
  const signIn = useAuthStore(state => state.signIn)
  const isAuth = useAuthStore(state => state.isAuth)

  useEffect(() => {
    if (state && state.from && isAuth) {
      navigate(state.from)
    }
  }, [isAuth])

  async function handleSignIn() {
    await signIn()
    navigate('/')
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-2">
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
