import { FC, ReactNode } from "react"
import Title from "../Title/Title"
import Text, { textSizes } from "../Text/Text"
import cl from "./Alert.module.scss"

const statusIcons = {
  error: cl.error,
  success: cl.success,
  warning: cl.warning,
}

type AlertProps = {
  status: keyof typeof statusIcons
  children: ReactNode
}

type AlertTitleProps = {
  size: textSizes
  children: ReactNode
}

type AlertDescriptionProps = {
  size: textSizes
  children: ReactNode
}

type AlertComposition = {
  Title: typeof AlertTitle
  Description: typeof AlertDescription
}

const Alert: FC<AlertProps> & AlertComposition = ({ status, children }) => {
  const styles = `${cl.alert} ${statusIcons[status]}`

  return (
    <div className={styles}>
      <span>{status}</span>
      {children}
    </div>
  )
}

const AlertTitle: FC<AlertTitleProps> = ({ size, children }) => {
  return (
    <Title how="h4" size={size}>
      {children}
    </Title>
  )
}

const AlertDescription: FC<AlertDescriptionProps> = ({ size, children }) => {
  return <Text size={size}>{children}</Text>
}

Alert.Title = AlertTitle
Alert.Description = AlertDescription

export default Alert
