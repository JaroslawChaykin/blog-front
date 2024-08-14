import { useEffect, useState } from "react"
import { IPost, PostsAPI } from "../../../API/Posts/Posts"
import PostController from "../../../components/PostController/PostController"
import Collection from "../../../components/Collection/Collection"

const ProfilePosts = () => {
  const [posts, setPosts] = useState<IPost[]>()

  useEffect(() => {
    const getOwnerPosts = async () => {
      const actualPosts = await PostsAPI.getOwnerPosts()

      setPosts(actualPosts)
    }

    getOwnerPosts()
  }, [])

  if (!posts) {
    return <span>Not found posts</span>
  }
  return (
    <div>
      <Collection listOfData={posts} displayData={(post) => <PostController post={post} />} />
    </div>
  )
}

export default ProfilePosts
