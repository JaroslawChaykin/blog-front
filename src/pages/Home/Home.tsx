import { useEffect } from "react"
import { fetchPosts } from "../../store/slices/Posts/fetchPost"
import { Link } from "react-router-dom"
import { deletePost } from "../../store/slices/Posts/posts"
import { getUser } from "../../store/slices/Auth/auth"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"

const Home = () => {
  const dispatch = useAppDispatch()
  const { posts } = useAppSelector((state) => state.posts)
  const user = useAppSelector(getUser)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  if (posts.status === "loading") {
    return <p>Loading posts</p>
  }

  if (posts.status === "error") {
    return <p>Posts error</p>
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
