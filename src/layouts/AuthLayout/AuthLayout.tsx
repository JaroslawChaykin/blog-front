import { FC } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { isAuthSelector } from "../../store/slices/Auth/auth"
import { useAppSelector } from "../../hooks/useAppSelector"
import { Button } from "../../UI"
import { MdOutlineArrowBackIos } from "react-icons/md"
import cl from "./AuthLayout.module.scss"

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
        <Button
          size="md"
          variant="primary"
          onClick={() => navigate("/")}
          leftIcon={<MdOutlineArrowBackIos />}
        >
          Вернутся
        </Button>
      </div>
    </div>
  )
}

export default AuthLayout
