import useFetch from "../../../hooks/useFetch"
import { useNavigate, useParams } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import { useIsOwner } from "../../../hooks/useIsOwner"
import { deletePost } from "../../../store/slices/Posts/posts"
import { IPost } from "../../../API/Posts/Posts"
import { useAppDispatch } from "../../../hooks/useAppDispatch"
import { BASE_URL } from "../../../constants"
import { Button, Title } from "../../../UI"
import { FaTrash } from "react-icons/fa"
import { RiEdit2Fill } from "react-icons/ri"
import cl from "./FullPost.module.scss"

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
    <div className={cl.fullPost}>
      {isOwner ? (
        <div className={cl.controlBtns}>
          <Button onClick={removePostHandler} variant="danger" size="md">
            <FaTrash />
          </Button>
          <Button onClick={() => navigate(`/posts/${data._id}/edit`)} variant="primary" size="md">
            <RiEdit2Fill />
          </Button>
        </div>
      ) : (
        ""
      )}

      <Title size="4xl" how="h1">
        {data.title}
      </Title>

      <div className={cl.content}>
        <ReactMarkdown children={data.text} />
      </div>
    </div>
  )
}

export default FullPost
