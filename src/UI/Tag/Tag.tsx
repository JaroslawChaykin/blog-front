import { FC, HTMLAttributes, ReactNode } from "react"
import cl from "./Tag.module.scss"

const variantStyles = {
  solid: cl.solid,
  outline: cl.outline,
  light: cl.light,
}

const sizeStyles = {
  sm: cl.sm,
  md: cl.md,
  lg: cl.lg,
}

type TagProps = {
  variant?: keyof typeof variantStyles
  size?: keyof typeof sizeStyles
  children: ReactNode
} & HTMLAttributes<HTMLSpanElement>

const Tag: FC<TagProps> = ({ variant = "solid", size = "md", children, ...rest }) => {
  const styles = `${cl.tag} ${variantStyles[variant]} ${sizeStyles[size]}`

  return (
    <span className={styles} {...rest}>
      {children}
    </span>
  )
}

export default Tag
