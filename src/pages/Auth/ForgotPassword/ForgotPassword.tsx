import { useNavigate } from "react-router-dom"
import { Button, Title } from "../../../UI"
import cl from "./ForgotPassword.module.scss"

const ForgotPassword = () => {
  const navigate = useNavigate()
  return (
    <div className={cl.forgotPassword}>
      <div className={cl.form_box}>
        <Title how="h1" size="6xl">
          А мне пофиг
        </Title>
        <Button variant="primary" size="lg" onClick={() => navigate("/sign-up")}>
          Создать новый аккаунт
        </Button>
      </div>
      <div className={cl.forgotPassword_void}></div>
    </div>
  )
}

export default ForgotPassword
