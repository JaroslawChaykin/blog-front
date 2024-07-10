import { FC } from "react"
import { IPost } from "../../API/Posts/Posts"
import { Link } from "react-router-dom"
import { FaCalendarAlt, FaCommentAlt, FaHeart, FaPlus, FaUser } from "react-icons/fa"
import { IoMdEye } from "react-icons/io"
import cl from "./PostCard.module.scss"
import { Tag, Text, Title } from "../../UI"
import Collection from "../Collection/Collection"

const PostCard: FC<IPost> = ({
  _id,
  title,
  viewsCount,
  tags,
  imageUrl,
  user,
  createdAt,
  updatedAt,
}) => {
  return (
    <div className={cl.post}>
      <Link to={`/posts/${_id}`}>
        <div className={cl.post_content}>
          <div className={cl.post_image}>
            <img src={`http://localhost:4444/${imageUrl}`} alt={title} />
          </div>
          <div className={cl.post_info}>
            <div className={cl.date}>
              <FaCalendarAlt />
              <Text>
                {createdAt} ({updatedAt})
              </Text>
            </div>

            <div className={cl.creator}>
              <div className={cl.avatar}>
                {user.avatarUrl ? <img src={user.avatarUrl} alt={user.nickname} /> : <FaUser />}
              </div>
              <Title size="lg">{user.nickname}</Title>
            </div>

            <Title size="3xl">{title}</Title>

            <div className={cl.sub_info}>
              <div className={cl.tags} title={tags.slice(2).join(", ")}>
                <Collection
                  orientation="horizontal"
                  listOfData={tags.slice(0, 2)}
                  displayData={(item, index) => (
                    <Tag variant="light" size="sm" key={index}>
                      {item}
                    </Tag>
                  )}
                />
                {tags.length - 2 ? (
                  <Tag size="sm" variant="outline">
                    <FaPlus />
                    {tags.length - 2}
                  </Tag>
                ) : (
                  ""
                )}
              </div>

              <div className={cl.social}>
                <span className={cl.social_item}>
                  <FaHeart />
                  <Text size="sm">0</Text>
                </span>
                <span className={cl.social_item}>
                  <FaCommentAlt />
                  <Text size="sm">0</Text>
                </span>
                <span className={cl.social_item}>
                  <IoMdEye />
                  <Text size="sm">{viewsCount}</Text>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PostCard
