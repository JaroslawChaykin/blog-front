import { FC, ReactNode } from "react"
import cl from "./Text.module.scss"

const textSizeStyles = {
  "6xl": cl.text_6xl,
  "5xl": cl.text_5xl,
  "4xl": cl.text_4xl,
  "3xl": cl.text_3xl,
  "2xl": cl.text_2xl,
  "xl": cl.text_xl,
  "lg": cl.text_lg,
  "md": cl.text_md,
  "sm": cl.text_sm,
  "xs": cl.text_xs,
}

type TextProps = {
  size: keyof typeof textSizeStyles
  color: string
  children: ReactNode
}

const Text: FC<TextProps> = ({ size, color = "black", children }) => {
  return (
    <p className={`${textSizeStyles[size]}`} style={{ color }}>
      {children}
    </p>
  )
}

export default Text
