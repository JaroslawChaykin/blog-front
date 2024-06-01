import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { fetchAuth } from "../../../store/slices/Auth/fetchAuth"

const Login = () => {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm({
    defaultValues: {
      email: "mail1@mail.ru",
      password: "123242321",
      shouldRemember: false,
    },
    mode: "onChange",
  })

  const onSubmit = (values) => {
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
            <input
              type="checkbox"
              {...register("shouldRemember")}
            />
            Запомнить меня
          </label>

          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login