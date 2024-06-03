import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RouterPath } from "./router.constants.js"
import { lazy, Suspense, useEffect } from "react"
import BasicLayout from "../layouts/BasicLayout.jsx"
import { useDispatch } from "react-redux"
import { fetchAuthMe } from "../store/slices/Auth/fetchAuthMe.js"
import AuthLayout from "../layouts/AuthLayout.jsx"

const LazyPage = (Page) => (
  <Suspense fallback={<div>loading...</div>}>
    <Page />
  </Suspense>
)

const routerList = createBrowserRouter([
  {
    element: <BasicLayout />,
    children: [
      {
        path: RouterPath.HOME,
        element: LazyPage(lazy(() => import("../pages/Home/Home.jsx"))),
      },
      {
        path: RouterPath.ADD_POST,
        element: LazyPage(lazy(() => import("../pages/Post/AddPost/AddPost.jsx"))),
      },
      {
        path: RouterPath.FULL_POST,
        element: LazyPage(lazy(() => import("../pages/Post/FullPost/FullPost.jsx"))),
      },
      {
        path: RouterPath.EDIT_POST,
        element: LazyPage(lazy(() => import("../pages/Post/AddPost/AddPost.jsx"))),
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: RouterPath.LOGIN,
        element: LazyPage(lazy(() => import("../pages/Auth/Login/Login.jsx"))),
      },
      {
        path: RouterPath.REGISTRATION,
        element: LazyPage(lazy(() => import("../pages/Auth/Registration/Registration.jsx"))),
      },
    ],
  },
])

const AppRouter = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])

  return <RouterProvider router={routerList} />
}

export default AppRouter