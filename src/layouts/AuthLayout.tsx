import { FC } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { isAuthSelector } from "../store/slices/Auth/auth"
import { useAppSelector } from "../hooks/useAppSelector.ts"

const AuthLayout: FC = () => {
  const isAuth = useAppSelector(isAuthSelector)
  const navigate = useNavigate()

  if (isAuth) {
    navigate("/")
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default AuthLayout
