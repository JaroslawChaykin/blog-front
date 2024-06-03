import useFetch from "../../../hooks/useFetch.js"
import { Link, useNavigate, useParams } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import { useIsOwner } from "../../../hooks/useIsOwner.js"
import { useDispatch } from "react-redux"
import { deletePost } from "../../../store/slices/Posts/posts.js"

const FullPost = () => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data, loading, error } = useFetch("http://localhost:4444/posts/" + params.id)
  const isOwner = useIsOwner(data?.user?._id)

  if (error) {
    return <p>Error</p>
  }

  if (loading || !data) {
    return <p>Loading...</p>
  }

  const removePostHandler = () => {
    dispatch(deletePost(data._id))

    navigate("/")
  }

  return (
    <div>
      <p>Full post {isOwner ? "owner" : ""}</p>

      <span>{isOwner ? <Link to={`/posts/${data._id}/edit`}>Edit</Link> : ""}</span>

      {isOwner ? <button onClick={removePostHandler}>Remove post</button> : ""}

      <h1>{data.title}</h1>

      <ReactMarkdown>{data.text}</ReactMarkdown>
    </div>
  )
}

export default FullPost