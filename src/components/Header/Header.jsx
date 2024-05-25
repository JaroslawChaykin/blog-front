import { Link } from "react-router-dom"
import { RouterPath } from "../../router/router.constants.js"

const Header = () => {
  return (
    <header>
      <Link to={RouterPath.HOME}> Home </Link> |
      <Link to={RouterPath.LOGIN}> Sign In </Link> |
      <Link to={RouterPath.REGISTRATION}> Sign Up </Link>
    </header>
  )
}

export default Header