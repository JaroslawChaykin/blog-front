import { InputHTMLAttributes, forwardRef } from "react"
import cl from "./Input.module.scss"

const variantStyles = {
  filled: cl.filled,
  outline: cl.outline,
  unstyled: cl.unstyled,
  underline: cl.underline,
}

type InputProps = {
  variant?: keyof typeof variantStyles
  isValid?: boolean
} & InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "filled", isValid = true, ...rest }, ref) => {
    const styles = `${cl.input} ${variantStyles[variant]} ${!isValid && cl.nonValid}`

    return <input className={styles} {...rest} ref={ref} />
  }
)

export default Input
