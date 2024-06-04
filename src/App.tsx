import "./App.css"
import AppRouter from "./router/AppRouter.jsx"
import { Provider } from "react-redux"
import store from "./store/store.js"

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}

export default App
