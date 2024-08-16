import { FC, lazy, Suspense, useLayoutEffect } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RouterPath } from "./router.constants"
import BasicLayout from "../layouts/BasicLayout/BasicLayout"
import { fetchAuthMe } from "../store/slices/Auth/fetchAuthMe"
import AuthLayout from "../layouts/AuthLayout/AuthLayout"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import { StatusAPI } from "../types/enums/status.enum"

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
      {
        path: RouterPath.PROFILE_POSTS,
        element: LazyPage(lazy(() => import("../pages/Profile/ProfilePosts/ProfilePosts"))),
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
      {
        path: RouterPath.FORGOT_PASSWORD,
        element: LazyPage(lazy(() => import("../pages/Auth/ForgotPassword/ForgotPassword"))),
      },
    ],
  },
])

const AppRouter = () => {
  const dispatch = useAppDispatch()
  const statusAuth = useAppSelector((store) => store.auth.status)

  useLayoutEffect(() => {
    dispatch(fetchAuthMe())
  }, [dispatch])

  if (statusAuth === StatusAPI.LOADING) {
    return <h1>Loading...</h1>
  }

  return <RouterProvider router={routerList} />
}

export default AppRouter
