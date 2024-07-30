import { FC } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { isAuthSelector } from "../../store/slices/Auth/auth"
import { useAppSelector } from "../../hooks/useAppSelector"
import cl from "./AuthLayout.module.scss"
import { IoMdReturnLeft } from "react-icons/io"
import { Button } from "../../UI"

const AuthLayout: FC = () => {
  const isAuth = useAppSelector(isAuthSelector)
  const navigate = useNavigate()

  if (isAuth) {
    navigate("/")
  }

  return (
    <div className={cl.authLayout}>
      <div className={cl.box}>
        <Outlet />
      </div>
      <div className={cl.void}></div>
      <div className={cl.exit}>
        <Button size="lg" variant="primary" onClick={() => navigate("/")}>
          <IoMdReturnLeft />
        </Button>
      </div>
    </div>
  )
}

export default AuthLayout
