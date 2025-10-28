import { Cart } from "./Cart"
import { Item } from "./Item"

export const Main = ({ data }) => {
  return (
    <main>
      <ul className="dessets">
        {data?.map(el =>
          <Item element={el} key={el.nombre} />
        )}
      </ul>
      <Cart data={data} />
    </main>
  )
}