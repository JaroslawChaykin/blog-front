import Header from "../../components/Header/Header"
import { Outlet } from "react-router-dom"
import { Container } from "../../UI"
import cl from "./BasicLayout.module.scss"

const BasicLayout = () => {
  return (
    <div className={cl.basicLayout}>
      <div className={cl.header}>
        <Container maxW={"lg"}>
          <Header />
        </Container>
      </div>
      <div className={cl.content}>
        <Container maxW={"lg"}>
          <div className={cl.contentSplit}>
            <div className={cl.leftSideBlock}>
              <Outlet />
            </div>
            <div className={cl.rightSideBlock}></div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default BasicLayout
