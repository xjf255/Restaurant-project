import { Item } from "./Item"

export const Main = ({addToCart,cart,removeToCart, data}) => {
  return (
    <main>
      <header>
        <h1>Dessets</h1>
      </header>
      <ul className="dessets">
        {data.map(el =>
          <Item element={el} addToCart={addToCart} cart={cart} removeToCart={removeToCart} key={el.name}></Item>
        )}
      </ul>
    </main>
  )
}