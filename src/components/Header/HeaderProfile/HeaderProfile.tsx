import { useState } from "react"
import Button from "../../../UI/Button/Button"
import { useAppDispatch } from "../../../hooks/useAppDispatch"
import { signOut } from "../../../store/slices/Auth/auth"
import cl from "./HeaderProfile.module.scss"
import { Link } from "react-router-dom"

const HeaderProfile = () => {
  const dispatch = useAppDispatch()
  const [showProfileOptions, setShowProfileOptions] = useState(false)

  const SignOutHandler = () => {
    dispatch(signOut())
  }

  const toggleShowProfileOptions = () => {
    setShowProfileOptions((prev) => !prev)
  }

  return (
    <div className={cl.profile}>
      <span onClick={toggleShowProfileOptions}>NickName</span>

      <div className={showProfileOptions ? cl.profile_options : cl.hidden}>
        <Link to="#">Profile</Link>
        <Link to="#">Settings</Link>
        <Button variant="primary" full onClickHandle={SignOutHandler}>
          Sign Out
        </Button>
      </div>
    </div>
  )
}

export default HeaderProfile
