import { useForm } from "react-hook-form"
import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { isAuthSelector } from "../../../store/slices/Auth/auth.js"
import { fetchRegistration } from "../../../store/slices/Auth/fetchRegistration.js"

const Registration = () => {
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
      firstName: "Andrey",
    },
    mode: "onChange",
  })

  const onSubmit = (values) => {
    dispatch(fetchRegistration(values))
  }
  console.log(isAuth, "")
  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <div>
      Registration
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
          <input
            type="firstName"
            placeholder="firstName"
            {...register("firstName", { required: "Укажите пароль" })}
          />
          <span>{errors.firstName?.message}</span>

          <button type="submit">Register me</button>

        </div>
      </form>
    </div>
  )
}

export default Registration