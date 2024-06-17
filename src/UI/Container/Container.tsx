import { FC, ReactNode } from "react"
import cl from "./Container.module.scss"

const ContainerStyles = {
  sm: cl.container_sm,
  md: cl.container_md,
  lg: cl.container_lg,
}

type ContainerProps = {
  maxW: keyof typeof ContainerStyles
  children: ReactNode
}

const Container: FC<ContainerProps> = ({ maxW = "sm", children }) => {
  return <div className={`${cl.container} ${ContainerStyles[maxW]}`}>{children}</div>
}

export default Container
