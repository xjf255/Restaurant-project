import { Cart } from "./Cart"
import { Item } from "./Item"

export const Main = ({ data, category}) => {
  return (
    <main>
      <ul className="dessets">
        {data?.map(el =>
          <Item key={el} element={el} category={category} />
        )}
      </ul>
      <Cart />
    </main>
  )
}