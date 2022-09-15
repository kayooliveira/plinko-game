import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'lib/firebase'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from 'store/auth'

export function RequireAuth() {
  const isAuth = useAuthStore(state => state.isAuth)
  const location = useLocation()
  const setUser = useAuthStore(state => state.setUser)
  onAuthStateChanged(auth, user => {
    if (user && !isAuth) {
      const { uid: id, displayName: name, email, photoURL: profilePic } = user
      if (name && email) {
        const newUser = { id, name, email, profilePic: profilePic || '' }
        setUser(newUser)
      }
    }
  })
  if (isAuth) {
    return <Outlet />
  } else {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname
        }}
      />
    )
  }
}
