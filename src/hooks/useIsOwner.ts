import { getUser } from "../store/slices/Auth/auth"
import { useAppSelector } from "./useAppSelector"

export const useIsOwner = (id: string) => {
  const user = useAppSelector(getUser)

  if (user) {
    return user._id === id
  }

  return false
}
