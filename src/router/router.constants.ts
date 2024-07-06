export const RouterPath = {
  HOME: "/",
  LOGIN: "/sign-in",
  REGISTRATION: "/sign-up",
  ADD_POST: "/add-post",
  FULL_POST: "/posts/:id",
  EDIT_POST: "/posts/:id/edit",
  PROFILE: "/:nickname",
}

export type RouterConstants = typeof RouterPath
