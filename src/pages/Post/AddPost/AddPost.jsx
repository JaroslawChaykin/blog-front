import { useSelector } from "react-redux"
import { isAuthSelector } from "../../../store/slices/Auth/auth.js"
import { Navigate } from "react-router-dom"
import SimpleMdeReact from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import styles from "./AddPost.module.scss"
import { useCallback, useMemo, useState } from "react"
import { UploadAPI } from "../../../API/Upload/Upload.js"
import { PostsAPI } from "../../../API/Posts/Posts.js"

const AddPost = () => {
  const isAuth = useSelector(isAuthSelector)
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
    if (e.key === "Enter") {
      setPostTags([...postTags, postTagInput])
      setPostTagInput("")
    }

    if (e.type === "click") {
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

    await PostsAPI.createPost(postData)

    return <Navigate to="/" />
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
        <button onClick={createPostHandler}>
          Create Post
        </button>
      </div>
    </div>
  )
}

export default AddPost