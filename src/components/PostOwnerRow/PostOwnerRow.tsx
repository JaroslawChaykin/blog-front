import { FC, ReactNode } from "react"
import { PostControllerProps } from "../PostController/PostController"
import { IoMdEye } from "react-icons/io"
import { Text } from "../../UI"
import { Link } from "react-router-dom"
import cl from "./PostOwnerRow.module.scss"

interface PostOwnerRowProps extends PostControllerProps {
  controllers: ReactNode
}

const PostOwnerRow: FC<PostOwnerRowProps> = ({ post, controllers }) => {
  const PostOwnerLinked = post.isPublic ? Link : "div"
  return (
    <div className={cl.post_row}>
      <PostOwnerLinked to={`/posts/${post._id}/`} className={cl.title}>
        {post.title}
        <div>
          <Text>
            <IoMdEye />
            {post.viewsCount}
          </Text>
        </div>
      </PostOwnerLinked>
      <div className={cl.controllers}>{controllers}</div>
    </div>
  )
}

export default PostOwnerRow
