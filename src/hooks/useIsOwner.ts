import { useSelector } from "react-redux"
import { getUser } from "../store/slices/Auth/auth"

export const useIsOwner = (id: string) => {
  const user = useSelector(getUser)

  if (user) {
    return user._id === id
  }

  return false
}
