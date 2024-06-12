import { FC } from "react"
import { useForm } from "react-hook-form"
import { fetchAuth } from "../../../store/slices/Auth/fetchAuth"
import { useAppDispatch } from "../../../hooks/useAppDispatch.ts"

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
    formState: { errors },
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
    <div>
      Login Page 1
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", flexDirection: "column", width: "250px", gap: "10px" }}>
          <input
            type="email"
            placeholder="email"
            {...register("email", { required: "Укажите почту" })}
          />
          <span>{errors.email?.message}</span>
          <input
            type="password"
            placeholder="password"
            {...register("password", { required: "Укажите пароль" })}
          />
          <span>{errors.password?.message}</span>
          <label>
            <input type="checkbox" {...register("shouldRemember")} />
            Запомнить меня
          </label>

          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login
