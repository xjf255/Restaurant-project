import { Cart } from "./Cart"
import { Item } from "./Item"
import data from "../mocks/data.json"

export const Main = () => {
  return (
    <main>
      <ul className="dessets">
        {data?.map(el =>
          <Item element={el} key={el.name} />
        )}
      </ul>
      <Cart data={data} />
    </main>
  )
}