import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { isAuthSelector } from "../store/slices/Auth/auth.js"

const AuthLayout = () => {
  const isAuth = useSelector(isAuthSelector)

  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default AuthLayout