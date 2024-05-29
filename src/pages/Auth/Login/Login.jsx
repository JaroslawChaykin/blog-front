import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { fetchAuth } from "../../../store/slices/Auth/fetchAuth"
import { isAuthSelector } from "../../../store/slices/Auth/auth.js"
import { Navigate } from "react-router-dom"

const Login = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(isAuthSelector)

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
    },
    mode: "onChange",
  })

  const onSubmit = (values) => {
    dispatch(fetchAuth(values))
  }

  if (isAuth) {
    return <Navigate to="/" />
  }

  console.log(isAuth)

  return (
    <div>
      Login Page

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

          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login