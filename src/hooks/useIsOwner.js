import { useSelector } from "react-redux"
import { getUser } from "../store/slices/Auth/auth.js"

export const useIsOwner = (id) => {
  const user = useSelector(getUser)

  if (user) {
    return user._id === id
  }

  return false
}