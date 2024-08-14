export const RouterPath = {
  HOME: "/",
  LOGIN: "/sign-in",
  REGISTRATION: "/sign-up",
  ADD_POST: "/add-post",
  FULL_POST: "/posts/:id",
  EDIT_POST: "/posts/:id/edit",
  PROFILE: "/:nickname",
  PROFILE_POSTS: "/:nickname/posts",
  FORGOT_PASSWORD: "/forgot-password",
}

export type RouterConstants = typeof RouterPath
