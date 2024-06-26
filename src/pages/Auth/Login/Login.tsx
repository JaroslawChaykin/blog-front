import { FC } from "react"
import { useForm } from "react-hook-form"
import { fetchAuth } from "../../../store/slices/Auth/fetchAuth"
import { useAppDispatch } from "../../../hooks/useAppDispatch"
import { Button, Input, Title } from "../../../UI"
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
          <span>{errors.email?.message}</span>

          <Input
            type="password"
            placeholder="password"
            {...register("password", { required: "Укажите пароль" })}
            isValid={!errors.password}
          />
          <span>{errors.password?.message}</span>

          <label>
            <Input type="checkbox" {...register("shouldRemember")} />
            Запомнить меня
          </label>

          <Button type="submit" variant="primary" size="lg" full disabled={!isValid}>
            Login
          </Button>
        </form>
      </div>
      <div className={cl.login_void}>
        <div className={cl.void_circle}></div>
        <div className={cl.void_blur}></div>
      </div>
    </div>
  )
}

export default Login
