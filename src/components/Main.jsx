import { useContext } from "react";
import { Cart } from "./Cart"
import { Item } from "./Item"
import { AdminContext } from "../context/admin";

export const Main = ({ data, category }) => {
  const { isAdmin } = useContext(AdminContext)
  return (
    <main>
      <ul className="dessets">
        {data?.map(el =>
          <Item key={el.toString()} element={el} category={category} />
        )}
      </ul>
      {!isAdmin && <Cart />}
    </main>
  )
}