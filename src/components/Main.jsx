import { Item } from "./Item"

export const Main = ({ data }) => {
  return (
    <main>
      <header>
        <h1>Dessets</h1>
      </header>
      <ul className="dessets">
        {data.map(el =>
          <Item element={el} key={el.name} />
        )}
      </ul>
    </main>
  )
}