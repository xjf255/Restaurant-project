import data from "./mocks/data.json"
import './App.css'
import { Main } from './components/Main'
import { Cart } from './components/Cart'

function App() {

  return (
    <>
      <Main data={data} />
      <Cart data={data} />
    </>
  )
}

export default App
