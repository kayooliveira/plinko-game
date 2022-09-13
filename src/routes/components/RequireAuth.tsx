import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from 'redux/slicers/sliceAuth'

export function RequireAuth() {
  const { isAuth } = useSelector(useAuth)
  const location = useLocation()
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
