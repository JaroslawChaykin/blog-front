import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react"
import Title from "../Title/Title"
import Text, { textSizes } from "../Text/Text"
import cl from "./Alert.module.scss"
import { AiFillCheckCircle, AiFillExclamationCircle, AiFillWarning } from "react-icons/ai"

const AlertContext = createContext<keyof typeof statusIcons>("success")

const statusStyles = {
  error: cl.error,
  success: cl.success,
  warning: cl.warning,
}

const statusIcons = {
  error: <AiFillExclamationCircle size="28px" color="#F42C04" />,
  success: <AiFillCheckCircle size="28px" color="#C6F91F" />,
  warning: <AiFillWarning size="28px" color="#FF8552" />,
}

type AlertProps = {
  status: keyof typeof statusStyles
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
  Icon: typeof AlertIcon
}

const Alert: FC<AlertProps> & AlertComposition = ({ status, children }) => {
  const styles = `${cl.alert} ${statusStyles[status]}`
  const [currentStatus, setCurrentStatus] = useState(status)

  useEffect(() => {
    setCurrentStatus(status)
  }, [status])

  return (
    <AlertContext.Provider value={currentStatus}>
      <div className={styles}>{children}</div>
    </AlertContext.Provider>
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

const AlertIcon: FC = () => {
  const styles = `${cl.icon}`
  const status = useContext(AlertContext)

  return <span className={styles}>{statusIcons[status]}</span>
}

Alert.Title = AlertTitle
Alert.Description = AlertDescription
Alert.Icon = AlertIcon

export default Alert
