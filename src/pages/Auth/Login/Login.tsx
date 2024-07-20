import { FC } from "react"
import { useForm } from "react-hook-form"
import { fetchAuth } from "../../../store/slices/Auth/fetchAuth"
import { useAppDispatch } from "../../../hooks/useAppDispatch"
import { Button, Input, Title } from "../../../UI"
import { Link } from "react-router-dom"
import cl from "./Login.module.scss"

interface LoginCredentials {
  email: string
  password: string
  shouldRemember: boolean
}

const Login: FC = () => {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "mail1@mail.ru",
      password: "123242321",
      shouldRemember: false,
    },
    mode: "onChange",
  })

  const onSubmit = (values: LoginCredentials) => {
    dispatch(fetchAuth(values))
  }

  return (
    <div className={cl.login}>
      <div className={cl.form_box}>
        <Title how="h1" size="4xl">
          Sign In
        </Title>
        <form onSubmit={handleSubmit(onSubmit)} className={cl.form}>
          <Input
            type="email"
            placeholder="email"
            {...register("email", { required: "Укажите почту" })}
            isValid={!errors.email}
          />
          <span className={cl.input_error}>{errors.email?.message}</span>

          <Input
            type="password"
            placeholder="password"
            {...register("password", { required: "Укажите пароль" })}
            isValid={!errors.password}
          />
          <span className={cl.input_error}>{errors.password?.message}</span>

          <label>
            <input type="checkbox" {...register("shouldRemember")} />
            Запомнить меня
          </label>

          <Button type="submit" variant="primary" size="lg" full disabled={!isValid}>
            Login
          </Button>

          <span>
            Нет аккаунта? <Link to="/sign-up">Зарегистрироваться</Link>
          </span>
          <span>
            <Link to="/forgot-password">Забыли пароль?</Link>
          </span>
        </form>
      </div>
      <div className={cl.login_void}></div>
    </div>
  )
}

export default Login
