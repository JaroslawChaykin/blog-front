import { useEffect, useState } from "react"
import Collection from "../../components/Collection/Collection"
import { Button, Text } from "../../UI"
import cl from "./Profile.module.scss"
import { IPost, PostsAPI } from "../../API/Posts/Posts"
import { useParams } from "react-router-dom"
import PostCard from "../../components/PostCard/PostCard"

const Profile = () => {
  const params = useParams()
  const [posts, setPosts] = useState<IPost[]>([])

  useEffect(() => {
    const getProfileInfo = async () => {
      const user = await PostsAPI.getUserPosts(params.nickname || "")
      const actualPosts = await PostsAPI.getUserPosts(params.nickname || "")

      setPosts(actualPosts)
    }

    getProfileInfo()
  }, [params])

  return (
    <div className={cl.profile}>
      <div className={cl.profile_author}>
        <div className={cl.author_avatar}></div>
        <div className={cl.author_names}>
          <Text size="md" bold>
            Van Helsing
          </Text>
          <Text>@van_hels</Text>
        </div>
        <div className={cl.author_career}>
          <div className={cl.career_item}>
            <Text size="md" bold>
              112
            </Text>
            <Text size="sm">Posts</Text>
          </div>
          <div className={cl.career_item}>
            <Text size="md" bold>
              442
            </Text>
            <Text size="sm">Followers</Text>
          </div>
          <div className={cl.career_item}>
            <Text size="md" bold>
              23
            </Text>
            <Text size="sm">Following</Text>
          </div>
        </div>
        <div className={cl.author_controls}>
          <Button variant="primary" size="lg" full>
            Редактировать
          </Button>
        </div>
      </div>
      <div className={cl.profile_posts}>
        <Collection listOfData={posts} displayData={(item) => <PostCard {...item} />} />
      </div>
      <div className={cl.profile_null}></div>
    </div>
  )
}

export default Profile
