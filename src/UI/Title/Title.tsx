import React, { FC, ReactNode } from "react"
import cl from "./Title.module.scss"
import { textSizes } from "../Text/Text"

const titleSizeStyles = {
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

type TitleProps = {
  how?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  size?: textSizes
  children: ReactNode
}

const Title: FC<TitleProps> = ({ how = "h1", size = "sm", children }) => {
  const styles = `head-title ${titleSizeStyles[size]}`

  const How = how

  return <How className={styles}>{children}</How>
}

export default Title
