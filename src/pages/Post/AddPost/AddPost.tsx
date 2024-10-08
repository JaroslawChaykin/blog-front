import { ChangeEvent, FC, useCallback, useLayoutEffect, useMemo, useState } from "react"
import { getUser, isAuthSelector } from "../../../store/slices/Auth/auth"
import { useNavigate, useParams } from "react-router-dom"
import SimpleMdeReact from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { UploadAPI } from "../../../API/Upload/Upload"
import { PostsAPI } from "../../../API/Posts/Posts"
import { useAppSelector } from "../../../hooks/useAppSelector"
import { Button, Input, Tag, Title, Text } from "../../../UI"
import Collection from "../../../components/Collection/Collection"
import { IoMdCloudUpload } from "react-icons/io"
import cl from "./AddPost.module.scss"

const AddPost: FC = () => {
  const navigate = useNavigate()
  const { id } = useParams() as { id: string }
  const isEditMode = Boolean(id)

  const isAuth = useAppSelector(isAuthSelector)
  const currentUser = useAppSelector(getUser)

  const [postBody, setPostBody] = useState<string>("")
  const [postImageUrl, setPostImageUrl] = useState<string>("")
  const [postTitle, setPostTitle] = useState<string>("")
  const [postTagInput, setPostTagInput] = useState<string>("")
  const [postTags, setPostTags] = useState<string[]>([])

  const options = useMemo(
    () => ({
      spellChecker: false,
      autofocus: true,
      placeholder: "Введите текст...",
      autosave: {
        uniqueId: "blog-mde",
        enabled: true,
        delay: 1000,
      },
    }),
    []
  )

  const postBodyHandler = useCallback((value: string) => {
    setPostBody(value)
  }, [])

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }

    const data = await UploadAPI.uploadImage(e.target.files[0])

    setPostImageUrl(data.url)
  }

  const addTag = (e: KeyboardEvent) => {
    if (e.key === "Enter" && postTagInput) {
      setPostTags([...postTags, postTagInput])
      setPostTagInput("")
    }
  }

  const removeTag = (tagName: string) => {
    setPostTags((prev) => prev.filter((item) => item !== tagName))
  }

  const addTagByClick = () => {
    if (postTagInput) {
      setPostTags([...postTags, postTagInput])
      setPostTagInput("")
    }
  }

  const createPostHandler = async () => {
    const postData = {
      title: postTitle,
      text: postBody,
      tags: postTags,
      imageUrl: postImageUrl,
    }

    const post = isEditMode
      ? await PostsAPI.updatePost(id, postData)
      : await PostsAPI.createPost(postData)

    if (post._id) {
      navigate("/posts/" + (id || post._id))
    }
  }

  const removeImage = () => {
    setPostImageUrl("")
  }

  useLayoutEffect(() => {
    const setCurrentPost = async () => {
      const post = await PostsAPI.getPostById(id)

      if (post.message) {
        navigate("/")
        return
      }

      if (post.user._id !== currentUser?._id) {
        navigate("/")
      }

      setPostBody(post.text)
      setPostImageUrl(post.imageUrl)
      setPostTitle(post.title)
      setPostTags(post.tags)
    }

    if (isEditMode) {
      setCurrentPost()
    }

    if (!isAuth) {
      navigate("/sign-in")
    }
  }, [isEditMode, id, currentUser, isAuth, navigate])

  return (
    <div className={cl.create_post}>
      <div className={cl.header_form}>
        <Title how="h1" size="4xl">
          {isEditMode ? "Обновление" : "Создание"}
        </Title>
        <Button variant="primary" size="lg" onClick={createPostHandler}>
          {isEditMode ? "Обновить пост" : "Создать пост"}
        </Button>
      </div>

      <div className={cl.form}>
        <div>
          <Input
            type="text"
            placeholder="Название поста"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
        </div>

        <div>
          <SimpleMdeReact
            className={cl.editor}
            value={postBody}
            onChange={postBodyHandler}
            placeholder="Введите текст"
            options={options}
          />
        </div>

        <div className={cl.tag_box}>
          <Collection
            orientation="horizontal"
            listOfData={postTags}
            displayData={(tag) => (
              <Tag size="sm" variant="light" onClick={() => removeTag(tag)}>
                {tag}
              </Tag>
            )}
          />

          <div className={cl.tag_controls}>
            <Input
              type="text"
              placeholder="Добавить тэг"
              value={postTagInput}
              onChange={(e) => setPostTagInput(e.target.value)}
              onKeyDown={addTag}
            />
            <Button variant="primary" size="lg" onClick={addTagByClick}>
              Добавить
            </Button>
          </div>
        </div>

        <div className={cl.image_post}>
          {postImageUrl ? (
            <>
              <div onClick={removeImage} className={cl.image}>
                <img src={"http://localhost:4444/" + postImageUrl} />
              </div>
              <Button variant="danger" size="md" full onClick={removeImage}>
                Удалить картинку
              </Button>
            </>
          ) : (
            <label>
              <Input type="file" onChange={handleChangeFile} hidden accept=".jpg,.jpeg,.png" />
              <Text size="4xl">
                <IoMdCloudUpload />
                Добавить картинку
              </Text>
            </label>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddPost
