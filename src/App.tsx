import AppRouter from "./router/AppRouter"
import { Provider } from "react-redux"
import store from "./store/store"
import "./assets/fonts/Gilroy-Regular.woff"
import "./assets/fonts/Gilroy-Bold.woff"
import "./App.scss"

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}

export default App
