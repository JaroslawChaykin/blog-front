import { Outlet, useLocation, useMatch } from "react-router-dom"
import Header from "../../components/Header/Header"
import { Container } from "../../UI"
import cl from "./BasicLayout.module.scss"

const BasicLayout = () => {
  const location = useLocation()
  const matchHome = useMatch("/")
  const pathWhiteList = [matchHome?.pathname]

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
            {pathWhiteList.includes(location.pathname) && <div className={cl.rightSideBlock}></div>}
          </div>
        </Container>
      </div>
    </div>
  )
}

export default BasicLayout
