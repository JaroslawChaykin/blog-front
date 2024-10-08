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

export type textSizes = keyof typeof textSizeStyles

type TextProps = {
  size?: textSizes
  bold?: boolean
  children: ReactNode
}

const Text: FC<TextProps> = ({ size = "sm", bold = false, children }) => {
  return <p className={`${cl.text} ${textSizeStyles[size]} ${bold && cl.bold}`}>{children}</p>
}

export default Text
