import { FC } from "react"
import { useForm } from "react-hook-form"
import { fetchRegistration } from "../../../store/slices/Auth/fetchRegistration"
import { useAppDispatch } from "../../../hooks/useAppDispatch"
import { Button, Input, Title } from "../../../UI/index"
import { Link } from "react-router-dom"
import cl from "./Registration.module.scss"

interface RegistrationCredentials {
  email: string
  password: string
  birthday: string
  nickname: string
  firstName: string
}

const Registration: FC = () => {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "mail1@mail.ru",
      password: "123242321",
      firstName: "Andrey",
      birthday: "",
      nickname: "",
    },
    mode: "onChange",
  })

  const onSubmit = (values: RegistrationCredentials) => {
    dispatch(fetchRegistration(values))
  }

  return (
    <div className={cl.registration}>
      <div className={cl.form_box}>
        <Title how="h1" size="4xl">
          Регистрация
        </Title>
        <form onSubmit={handleSubmit(onSubmit)} className={cl.form}>
          <Input
            type="email"
            placeholder="email"
            {...register("email", { required: "Укажите почту" })}
          />
          <span className={cl.input_error}>{errors.email?.message}</span>

          <Input
            type="password"
            placeholder="password"
            {...register("password", { required: "Укажите пароль" })}
          />
          <span className={cl.input_error}>{errors.password?.message}</span>

          <Input
            type="firstName"
            placeholder="firstName"
            {...register("firstName", { required: "Укажите имя" })}
          />
          <span className={cl.input_error}>{errors.firstName?.message}</span>

          <Input
            type="nickname"
            placeholder="nickname"
            {...register("nickname", { required: "Укажите nickname" })}
          />
          <span className={cl.input_error}>{errors.nickname?.message}</span>

          <Input
            type="birthday"
            placeholder="birthday"
            {...register("birthday", { required: "Укажите дату рождения" })}
          />
          <span className={cl.input_error}>{errors.birthday?.message}</span>

          <Button type="submit" variant="primary" size="lg" full disabled={!isValid}>
            Sign Up
          </Button>

          <span>
            Есть аккаунт? <Link to="/sign-in">Авторизоваться</Link>
          </span>
        </form>
      </div>
      <div className={cl.registration_void}></div>
    </div>
  )
}

export default Registration
