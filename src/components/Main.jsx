import { Cart } from "./Cart"
import { Item } from "./Item"

export const Main = ({ data, category }) => {
  console.log("Main data:", data);
  return (
    <main>
      <ul className="dessets">
        {data?.map(el =>
          <Item key={el.toString()} element={el} category={category} />
        )}
      </ul>
      <Cart />
    </main>
  )
}