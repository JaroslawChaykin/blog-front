import { FC } from "react"
import { Link } from "react-router-dom"
import { RouterPath } from "../../router/router.constants.js"
import { isAuthSelector } from "../../store/slices/Auth/auth"
import { useAppSelector } from "../../hooks/useAppSelector"
import HeaderProfile from "./HeaderProfile/HeaderProfile"
import cl from "./Header.module.scss"

const Header: FC = () => {
  const isAuth = useAppSelector(isAuthSelector)

  return (
    <header className={cl.header}>
      <Link to={RouterPath.HOME}> Home </Link>

      <div className={cl.auth}>
        {isAuth ? (
          <HeaderProfile />
        ) : (
          <span>
            <Link to={RouterPath.LOGIN}> Sign In </Link>
            <Link to={RouterPath.REGISTRATION}> Sign Up </Link>
          </span>
        )}
      </div>
    </header>
  )
}

export default Header
