import { FC, ReactNode } from "react"
import cl from "./SignedToggleCheckbox.module.scss"
import { Text } from "../../UI"

type SignedToggleCheckboxProps = {
  text: string
  checkbox: ReactNode
  onClick?: () => void
}

const SignedToggle: FC<SignedToggleCheckboxProps> = ({ text, checkbox, onClick }) => {
  return (
    <div className={cl.signed_toggle} onClick={onClick}>
      <Text>{text}</Text>
      {checkbox}
    </div>
  )
}

export default SignedToggle
