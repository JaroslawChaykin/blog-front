import { FC } from "react"
import { useForm } from "react-hook-form"
import { fetchRegistration } from "../../../store/slices/Auth/fetchRegistration.js"
import { useAppDispatch } from "../../../hooks/useAppDispatch.ts"

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
    formState: { errors },
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
            {...register("firstName", { required: "Укажите имя" })}
          />
          <span>{errors.firstName?.message}</span>

          <input
            type="nickname"
            placeholder="nickname"
            {...register("nickname", { required: "Укажите nickname" })}
          />
          <span>{errors.nickname?.message}</span>

          <input
            type="birthday"
            placeholder="birthday"
            {...register("birthday", { required: "Укажите дату рождения" })}
          />
          <span>{errors.birthday?.message}</span>

          <button type="submit">Register me</button>
        </div>
      </form>
    </div>
  )
}

export default Registration
