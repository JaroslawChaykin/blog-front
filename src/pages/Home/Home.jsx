import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchPosts, postsSlice } from "../../store/slices/posts.js"

const Home = () => {
  const dispatch = useDispatch()
  const { posts, tags } = useSelector(state => state.posts)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  if (posts.status === "loading") {
    return <p>Loading posts</p>
  }

  if (posts.status === "error") {
    return <p>Posts error</p>
  }

  return (
    <div>
      Home page
      {
        posts.data.map(post => <p>{post.title}</p>)
      }
    </div>
  )
}

export default Home