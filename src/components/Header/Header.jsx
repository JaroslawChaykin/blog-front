import { Link } from "react-router-dom"
import { RouterPath } from "../../router/router.constants.js"
import { isAuthSelector, signOut } from "../../store/slices/Auth/auth.js"
import { useDispatch, useSelector } from "react-redux"

const Header = () => {
  const isAuth = useSelector(isAuthSelector)
  const dispatch = useDispatch()

  const SignOutHandler = () => {
    dispatch(signOut())
  }

  return (
    <header>
      <Link to={RouterPath.HOME}> Home </Link> |
      <Link to={RouterPath.ADD_POST}> Add post </Link> |
      {
        isAuth ?
          <span>
            <button onClick={SignOutHandler}>Sign Out</button>
          </span>
          :
          <span>
            <Link to={RouterPath.LOGIN}> Sign In </Link> |
            <Link to={RouterPath.REGISTRATION}> Sign Up </Link>
          </span>
      }
    </header>
  )
}

export default Header