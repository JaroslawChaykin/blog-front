import { FC, useState } from "react"
import PostOwnerRow from "../PostOwnerRow/PostOwnerRow"
import { IPost, PostsAPI } from "../../API/Posts/Posts"
import { Button, ToggleCheckbox } from "../../UI"
import { FaTrash } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { RiEdit2Fill } from "react-icons/ri"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { deletePost } from "../../store/slices/Posts/posts"
import SignedToggleCheckbox from "../SignedToggleCheckbox/SignedToggleCheckbox"

export type PostControllerProps = {
  post: IPost
}

const PostController: FC<PostControllerProps> = ({ post }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [postStatus, setPostStatus] = useState(post.isPublic)

  const removePostHandler = () => {
    dispatch(deletePost(post._id))

    navigate("/")
  }

  const setStatusOfPost = async () => {
    const actualPostStatus = await PostsAPI.updateStatusPublicPost(post._id, {
      isPublic: !postStatus,
    })

    setPostStatus(actualPostStatus.isPublic)
  }

  return (
    <PostOwnerRow
      post={post}
      controllers={
        <>
          <SignedToggleCheckbox
            text="Публичный"
            checkbox={<ToggleCheckbox size="sm" checked={postStatus} onChange={setStatusOfPost} />}
          />
          <Button onClick={removePostHandler} variant="danger" size="md">
            <FaTrash />
          </Button>
          <Button onClick={() => navigate(`/posts/${post._id}/edit`)} variant="primary" size="md">
            <RiEdit2Fill />
          </Button>
        </>
      }
    />
  )
}

export default PostController
