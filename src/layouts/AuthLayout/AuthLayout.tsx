import { FC } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { isAuthSelector } from "../../store/slices/Auth/auth"
import { useAppSelector } from "../../hooks/useAppSelector"
import cl from "./AuthLayout.module.scss"

const AuthLayout: FC = () => {
  const isAuth = useAppSelector(isAuthSelector)
  const navigate = useNavigate()

  if (isAuth) {
    navigate("/")
  }

  return (
    <div className={cl.authLayout}>
      <div className={cl.form}>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
