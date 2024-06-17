import { FC, ReactNode } from "react"
import cl from "./Container.module.scss"

type ContainerProps = {
  maxW: "sm" | "md" | "lg"
  children: ReactNode
}

const Container: FC<ContainerProps> = ({ maxW = "sm", children }) => {
  const styles = {
    sm: cl.container_sm,
    md: cl.container_md,
    lg: cl.container_lg,
  }

  return <div className={`${cl.container} ${styles[maxW]}`}>{children}</div>
}

export default Container
