import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchPosts } from "../../store/slices/Posts/fetchPost.js"
import { Link } from "react-router-dom"

const Home = () => {
  const dispatch = useDispatch()
  const { posts } = useSelector(state => state.posts)

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
        posts.data.map(post => <div><Link to={"posts/" + post._id}>{post.title}</Link></div>)
      }
    </div>
  )
}

export default Home