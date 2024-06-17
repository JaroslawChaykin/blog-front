import Header from "../components/Header/Header"
import { Outlet } from "react-router-dom"
import { Container } from "../UI"

const BasicLayout = () => {
  return (
    <Container maxW={"lg"}>
      <Header />

      <Outlet />
    </Container>
  )
}

export default BasicLayout
