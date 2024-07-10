import { useEffect } from "react"
import { fetchPosts } from "../../store/slices/Posts/fetchPost"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { StatusAPI } from "../../types/enums/status.enum"
import { Alert, Button, Title } from "../../UI"
import PostCard from "../../components/PostCard/PostCard"
import { useNavigate } from "react-router-dom"
import { RouterPath } from "../../router/router.constants"
import { getPosts, getPostsStatus } from "../../store/slices/Posts/posts"
import Collection from "../../components/Collection/Collection"
import cl from "./Home.module.scss"

const Home = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const posts = useAppSelector(getPosts)
  const postsStatus = useAppSelector(getPostsStatus)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  if (postsStatus === StatusAPI.LOADING) {
    return (
      <Alert status="warning">
        <Alert.Icon />
        <Alert.Title size="2xl">Posts: </Alert.Title>
        <Alert.Description size="2xl">Loading</Alert.Description>
      </Alert>
    )
  }

  if (postsStatus === StatusAPI.ERROR) {
    return (
      <Alert status="error">
        <Alert.Icon />
        <Alert.Title size="2xl">Posts: </Alert.Title>
        <Alert.Description size="2xl">Error not loaded</Alert.Description>
      </Alert>
    )
  }

  return (
    <div>
      <div className={cl.homeHeader}>
        <Title size="4xl">Лента</Title>
        <Button variant="primary" size="md" onClick={() => navigate(RouterPath.ADD_POST)}>
          Создать пост
        </Button>
      </div>
      {posts.length === 0 ? (
        <Alert status="warning">
          <Alert.Icon />
          <Alert.Title size="2xl">Posts: </Alert.Title>
          <Alert.Description size="2xl">Not found posts</Alert.Description>
        </Alert>
      ) : (
        <Collection
          orientation="vertical"
          listOfData={posts}
          displayData={(item) => <PostCard {...item} key={item._id} />}
        />
      )}
    </div>
  )
}

export default Home
