import useFetch from "../../../hooks/useFetch"
import { Link, useNavigate, useParams } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import { useIsOwner } from "../../../hooks/useIsOwner"
import { deletePost } from "../../../store/slices/Posts/posts"
import { IPost } from "../../../API/Posts/Posts"
import { useAppDispatch } from "../../../hooks/useAppDispatch"
import { BASE_URL } from "../../../../constants"

const FullPost = () => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { data, loading, error } = useFetch<IPost>(`${BASE_URL}/posts/${params.id}`)
  const isOwner = useIsOwner(data?.user?._id || "")

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
