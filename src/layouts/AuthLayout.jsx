import { Outlet, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { isAuthSelector } from "../store/slices/Auth/auth.js"

const AuthLayout = () => {
  const isAuth = useSelector(isAuthSelector)
  const navigate = useNavigate()

  if (isAuth) {
    navigate(-1)
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default AuthLayout