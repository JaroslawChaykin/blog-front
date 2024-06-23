import { ButtonHTMLAttributes, FC, ReactNode } from "react"
import cl from "./Button.module.scss"

const sizeStyles = {
  sm: cl.size_sm,
  md: cl.size_md,
  lg: cl.size_lg,
}

const variantStyles = {
  primary: cl.primary,
  outline: cl.outline,
  default: cl.default,
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children?: ReactNode
  variant?: keyof typeof variantStyles
  size?: keyof typeof sizeStyles
  full?: boolean
  disabled?: boolean
  onClickHandle?: () => void
}

const Button: FC<ButtonProps> = ({
  leftIcon,
  rightIcon,
  children,
  variant = "default",
  size = "sm",
  full,
  disabled,
  onClickHandle,
  ...rest
}) => {
  const styles = `${cl.btn} ${sizeStyles[size]} ${variantStyles[variant]} ${full ? cl.full : ""}`

  return (
    <button className={styles} disabled={disabled} onClick={onClickHandle} {...rest}>
      {leftIcon}
      <span>{children}</span>
      {rightIcon}
    </button>
  )
}

export default Button
