import Header from "../components/Header/Header.jsx"
import { Outlet } from "react-router-dom"

const BasicLayout = () => {
  return (
    <div>
      <Header />

      <Outlet />
    </div>
  )
}

export default BasicLayout