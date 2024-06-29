import { useEffect } from "react"
import { fetchPosts } from "../../store/slices/Posts/fetchPost"
import { Link } from "react-router-dom"
import { deletePost } from "../../store/slices/Posts/posts"
import { getUser } from "../../store/slices/Auth/auth"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { StatusAPI } from "../../types/enums/status.enum"
import { Alert } from "../../UI"

const Home = () => {
  const dispatch = useAppDispatch()
  const { posts } = useAppSelector((state) => state.posts)
  const user = useAppSelector(getUser)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  if (posts.status === StatusAPI.LOADING) {
    return (
      <Alert status="warning">
        <Alert.Icon />
        <Alert.Title size="2xl">Posts: </Alert.Title>
        <Alert.Description size="2xl">Loading</Alert.Description>
      </Alert>
    )
  }

  if (posts.status === StatusAPI.ERROR) {
    return (
      <Alert status="error">
        <Alert.Icon />
        <Alert.Title size="2xl">Posts: </Alert.Title>
        <Alert.Description size="2xl">Error not loaded</Alert.Description>
      </Alert>
    )
  }

  const removePostHandler = (id: string) => {
    dispatch(deletePost(id))
  }

  return (
    <div>
      Home page
      {posts.data.map((post) => (
        <div>
          <Link to={"posts/" + post._id}>{post.title}</Link>
          {post.user._id === user?._id ? (
            <span>
              <button onClick={() => removePostHandler(post._id)}>Delete Post</button>
              <Link to={`/posts/${post._id}/edit`}>Edit Post</Link>
            </span>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  )
}

export default Home
