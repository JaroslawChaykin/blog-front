import { useNavigate } from "react-router-dom"
import { Button, Title } from "../../../UI"
import cl from "./ForgotPassword.module.scss"

const ForgotPassword = () => {
  const navigate = useNavigate()

  return (
    <div className={cl.forgotPassword}>
      <Title how="h1" size="6xl">
        А мне пофиг
      </Title>
      <Button variant="primary" size="lg" onClick={() => navigate("/sign-up")}>
        Создать новый аккаунт
      </Button>
    </div>
  )
}

export default ForgotPassword
