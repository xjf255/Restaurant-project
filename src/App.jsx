import data from "./mocks/data.json"
import './App.css'
import { Main } from './components/Main'
import { Cart } from './components/Cart'
import { useQuery } from "@tanstack/react-query"

function App() {

  const fetchData = async () => {
    // const data = await fetch("http://20.121.130.161/grupo5/api/status")
    const data = await fetch("http://localhost:8080/api/status")
    if (!data.ok) {
      throw new Error('Error en la obtencion de datos')
    }
    return data.json()
  }

  const { isLoading, data: statusApi, isError } = useQuery({
    queryKey: ['status'],//key => para identificar query
    queryFn: fetchData// function => para obtener datos
  })


  return (
    <>
      <Main data={data} />
      <Cart data={data} />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Ha habido un error</p>}
      {statusApi ? statusApi.map((el) => {
        const { cod_status, name_status } = el
        console.log(cod_status, name_status)
        return (
          <h4 key={cod_status}>{name_status}</h4>
        )
      }) : false}
    </>
  )
}

export default App
