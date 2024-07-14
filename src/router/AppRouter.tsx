import { FC, lazy, Suspense, useEffect } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RouterPath } from "./router.constants"
import BasicLayout from "../layouts/BasicLayout/BasicLayout"
import { fetchAuthMe } from "../store/slices/Auth/fetchAuthMe"
import AuthLayout from "../layouts/AuthLayout/AuthLayout"
import { useAppDispatch } from "../hooks/useAppDispatch"

const LazyPage = (Page: FC) => (
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
        element: LazyPage(lazy(() => import("../pages/Home/Home"))),
      },
      {
        path: RouterPath.ADD_POST,
        element: LazyPage(lazy(() => import("../pages/Post/AddPost/AddPost"))),
      },
      {
        path: RouterPath.FULL_POST,
        element: LazyPage(lazy(() => import("../pages/Post/FullPost/FullPost"))),
      },
      {
        path: RouterPath.EDIT_POST,
        element: LazyPage(lazy(() => import("../pages/Post/AddPost/AddPost"))),
      },
      {
        path: RouterPath.PROFILE,
        element: LazyPage(lazy(() => import("../pages/Profile/Profile"))),
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: RouterPath.LOGIN,
        element: LazyPage(lazy(() => import("../pages/Auth/Login/Login"))),
      },
      {
        path: RouterPath.REGISTRATION,
        element: LazyPage(lazy(() => import("../pages/Auth/Registration/Registration"))),
      },
    ],
  },
])

const AppRouter = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [dispatch])

  return <RouterProvider router={routerList} />
}

export default AppRouter
