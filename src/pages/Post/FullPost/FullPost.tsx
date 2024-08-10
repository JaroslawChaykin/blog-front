import useFetch from "../../../hooks/useFetch"
import { useNavigate, useParams } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import { useIsOwner } from "../../../hooks/useIsOwner"
import { deletePost } from "../../../store/slices/Posts/posts"
import { IPost } from "../../../API/Posts/Posts"
import { useAppDispatch } from "../../../hooks/useAppDispatch"
import { BASE_URL } from "../../../constants"
import { Button, Tag, Text, Title } from "../../../UI"
import { FaTrash } from "react-icons/fa"
import { RiEdit2Fill } from "react-icons/ri"
import { IoMdEye } from "react-icons/io"
import Collection from "../../../components/Collection/Collection"
import { formattingDate } from "../../../utils"
import cl from "./FullPost.module.scss"

const FullPost = () => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { data, loading, error } = useFetch<IPost>(`${BASE_URL}/posts/${params.id}`)
  const isOwner = useIsOwner(data?.user?._id || "")
  const { year, day, monthName, hours, minutes } = formattingDate(data?.createdAt)
  const formattedDate = `${hours}:${minutes} ·  ${day} ${monthName} ${year}`

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
      <div className={cl.postImage}>
        {data.imageUrl ? (
          <img src={`http://localhost:4444/${data.imageUrl}`} alt={data.imageUrl} />
        ) : (
          <div className={cl.imagePlaceholder}></div>
        )}

        <div className={cl.postInfoBox}>
          <div className={cl.postInfoContent}>
            <Text>{formattedDate}</Text>
            <Button size="md" onClick={() => navigate(`/${data.user.nickname}`)}>
              {data.user.nickname}
            </Button>
            <Text>
              <IoMdEye /> {data.viewsCount}
            </Text>
          </div>
        </div>

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
      </div>
      <div className={cl.content}>
        <Title size="4xl" how="h1">
          {data.title}
        </Title>

        <Collection
          orientation="horizontal"
          listOfData={data.tags}
          displayData={(item, index) => (
            <Tag variant="solid" size="sm" key={index}>
              {item}
            </Tag>
          )}
        />

        <ReactMarkdown children={data.text} />
      </div>
    </div>
  )
}

export default FullPost
