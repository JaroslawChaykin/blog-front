import Header from "../../components/Header/Header"
import { Outlet } from "react-router-dom"
import { Container } from "../../UI"
import cl from "./BasicLayout.module.scss"

const BasicLayout = () => {
  const styles = `${cl.basicLayout}`
  const stylesHeader = `${cl.header}`
  return (
    <div className={styles}>
      <div className={stylesHeader}>
        <Container maxW={"lg"}>
          <Header />
        </Container>
      </div>
      <Container maxW={"lg"}>
        <Outlet />
      </Container>
    </div>
  )
}

export default BasicLayout
