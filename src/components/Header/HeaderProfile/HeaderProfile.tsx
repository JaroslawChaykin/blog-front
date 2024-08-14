import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch } from "../../../hooks/useAppDispatch"
import { getUser, signOut } from "../../../store/slices/Auth/auth"
import { useAppSelector } from "../../../hooks/useAppSelector"
import { Button } from "../../../UI"
import { GiHamburgerMenu } from "react-icons/gi"
import { setFirstLetterUpper } from "../../../utils"
import cl from "./HeaderProfile.module.scss"

const HeaderProfile = () => {
  const dispatch = useAppDispatch()
  const [showProfileOptions, setShowProfileOptions] = useState(false)
  const user = useAppSelector(getUser)
  const profileOptionsRef = useRef<HTMLDivElement>(null)

  const SignOutHandler = () => {
    dispatch(signOut())
  }

  const clickAroundHeaderProfile = (e: MouseEvent) => {
    if (!profileOptionsRef.current) return
    if (!profileOptionsRef.current.contains(e.target as Node)) {
      setShowProfileOptions(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click", clickAroundHeaderProfile)

    return () => {
      document.removeEventListener("click", clickAroundHeaderProfile)
    }
  }, [showProfileOptions])

  return (
    <div className={cl.profile} ref={profileOptionsRef}>
      <Button
        rightIcon={<GiHamburgerMenu />}
        variant="default"
        size="md"
        onClick={() => setShowProfileOptions((prev) => !prev)}
      >
        {setFirstLetterUpper(user!.nickname)}
      </Button>

      <div className={`${cl.profile_options} ${!showProfileOptions ? cl.hidden : ""}`}>
        <Link to={`${user?.nickname}`}>Профиль</Link>
        <Link to={`${user?.nickname}/posts`}>Ваши посты</Link>
        <Link to={`${user?.nickname}/settings`}>Настройки</Link>
        <Button variant="primary" full onClick={SignOutHandler}>
          Выйти
        </Button>
      </div>
    </div>
  )
}

export default HeaderProfile
