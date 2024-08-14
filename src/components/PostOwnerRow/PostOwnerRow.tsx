import { FC, ReactNode } from "react"
import { PostControllerProps } from "../PostController/PostController"
import { IoMdEye } from "react-icons/io"
import { Text } from "../../UI"
import cl from "./PostOwnerRow.module.scss"

interface PostOwnerRowProps extends PostControllerProps {
  controllers: ReactNode
}

const PostOwnerRow: FC<PostOwnerRowProps> = ({ post, controllers }) => {
  return (
    <div className={cl.post_row}>
      <div>{post.title}</div>
      <div className={cl.post_row_right}>
        <div>
          <Text>
            <IoMdEye />
            {post.viewsCount}
          </Text>
        </div>
        <div className={cl.controllers}>{controllers}</div>
      </div>
    </div>
  )
}

export default PostOwnerRow
