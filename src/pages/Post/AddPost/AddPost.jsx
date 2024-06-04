import { useSelector } from "react-redux"
import { isAuthSelector } from "../../../store/slices/Auth/auth.js"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import SimpleMdeReact from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import styles from "./AddPost.module.scss"
import { useCallback, useEffect, useMemo, useState } from "react"
import { UploadAPI } from "../../../API/Upload/Upload.js"
import { PostsAPI } from "../../../API/Posts/Posts.js"

const AddPost = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditMode = Boolean(id)

  const isAuth = useSelector(isAuthSelector)
  const [postCreateError, setPostCreateError] = useState("")

  const [postBody, setPostBody] = useState("")
  const [postImageUrl, setPostImageUrl] = useState("")
  const [postTitle, setpostTitle] = useState("")
  const [postTagInput, setPostTagInput] = useState("")
  const [postTags, setPostTags] = useState([])

  if (!isAuth) {
    return <Navigate to="/sign-in" />
  }


  const postBodyHandler = useCallback(value => {
    setPostBody(value)
  }, [])

  const handleChangeFile = async (e) => {
    const data = await UploadAPI.uploadImage(e.target.files[0])
    setPostImageUrl(data.url)
  }

  const addTag = (e) => {
    if (e.key === "Enter" || e.type === "click") {
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

    const post = isEditMode ? await PostsAPI.updatePost(id, postData) : await PostsAPI.createPost(postData)

    if (post.message === "Updated" || post._id) {
      navigate("/posts/" + (id || post._id))
    } else {
      setPostCreateError("Не удалось создать пост")
    }
  }

  const options = useMemo(() => ({
    spellChecker: false,
    autofocus: true,
    placeholder: "Введите текст...",
    autosave: {
      enabled: true,
      delay: 1000,
    },
  }), [])

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
          <input
            type="file"
            onChange={handleChangeFile}
            hidden
          />
          Добавить картинку
        </label>
      </div>

      <hr />
      <div>
        <input
          type="text"
          placeholder="Заголовок статьи..."
          value={postTitle}
          onChange={e => setpostTitle(e.target.value)}
        />

        {postTags.map((tag => <span>{tag}</span>))}

        <input
          type="text"
          placeholder="Добавить тэг"
          value={postTagInput}
          onChange={(e) => setPostTagInput(e.target.value)}
          onKeyDown={addTag}
        />
        <button onClick={addTag}>Add Tag</button>

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
        <button onClick={createPostHandler}>
          {isEditMode ? "Update Post" : "Create Post"}
        </button>
      </div>
    </div>
  )
}

export default AddPost