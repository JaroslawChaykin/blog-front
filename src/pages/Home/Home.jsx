import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchPosts } from "../../store/slices/Posts/fetchPost.js"
import { Link } from "react-router-dom"
import { deletePost } from "../../store/slices/Posts/posts.js"
import { getUser } from "../../store/slices/Auth/auth.js"

const Home = () => {
  const dispatch = useDispatch()
  const { posts } = useSelector(state => state.posts)
  const user = useSelector(getUser)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  if (posts.status === "loading") {
    return <p>Loading posts</p>
  }

  if (posts.status === "error") {
    return <p>Posts error</p>
  }

  const removePostHandler = (id) => {
    dispatch(deletePost(id))
  }

  return (
    <div>
      Home page
      {
        posts.data.map(post => (
          <div>
            <Link to={"posts/" + post._id}>{post.title}</Link>
            {
              post.user._id === user?._id ?
                <span>
                  <button onClick={() => removePostHandler(post._id)}>Delete Post</button>
                  <Link to={`/posts/${post._id}/edit`}>Edit Post</Link>
                </span> : ""
            }

          </div>
        ))
      }
    </div>
  )
}

export default Home