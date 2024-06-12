import { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from "react"
import { isAuthSelector } from "../../../store/slices/Auth/auth"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import SimpleMdeReact from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import styles from "./AddPost.module.scss"
import { UploadAPI } from "../../../API/Upload/Upload"
import { PostsAPI } from "../../../API/Posts/Posts"
import { useAppSelector } from "../../../hooks/useAppSelector.ts"

const AddPost: FC = () => {
  const navigate = useNavigate()
  const { id } = useParams() as { id: string }
  const isEditMode = Boolean(id)

  const isAuth = useAppSelector(isAuthSelector)
  const [postCreateError, setPostCreateError] = useState("")

  const [postBody, setPostBody] = useState<string>("")
  const [postImageUrl, setPostImageUrl] = useState<string>("")
  const [postTitle, setpostTitle] = useState<string>("")
  const [postTagInput, setPostTagInput] = useState<string>("")
  const [postTags, setPostTags] = useState<string[]>([])

  if (!isAuth) {
    return <Navigate to="/sign-in" />
  }

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
    if (e.key === "Enter") {
      setPostTags([...postTags, postTagInput])
      setPostTagInput("")
    }
  }

  const addTagByClick = () => {
    setPostTags([...postTags, postTagInput])
    setPostTagInput("")
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
    } else {
      setPostCreateError("Не удалось создать пост")
    }
  }

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

  useEffect(() => {
    const setCurrentPost = async () => {
      const post = await PostsAPI.getPostById(id)

      setPostBody(post.text)
      setPostImageUrl(post.imageUrl)
      setpostTitle(post.title)
      setPostTags(post.tags)
    }

    if (isEditMode) {
      setCurrentPost()
    }
  }, [id])

  return (
    <div>
      Add post
      <hr />
      <div>
        <img src={"http://localhost:4444/" + postImageUrl} alt="image" />
        <label>
          <input type="file" onChange={handleChangeFile} hidden />
          Добавить картинку
        </label>
      </div>
      <hr />
      <div>
        <input
          type="text"
          placeholder="Заголовок статьи..."
          value={postTitle}
          onChange={(e) => setpostTitle(e.target.value)}
        />

        {postTags.map((tag) => (
          <span>{tag}</span>
        ))}

        <input
          type="text"
          placeholder="Добавить тэг"
          value={postTagInput}
          onChange={(e) => setPostTagInput(e.target.value)}
          onKeyDown={addTag}
        />
        <button onClick={addTagByClick}>Add Tag</button>

        <SimpleMdeReact
          className={styles.editor}
          value={postBody}
          onChange={postBodyHandler}
          placeholder="Введите текст"
          options={options}
        />
      </div>
      <div>
        <span>{postCreateError}</span>
        <button onClick={createPostHandler}>{isEditMode ? "Update Post" : "Create Post"}</button>
      </div>
    </div>
  )
}

export default AddPost
