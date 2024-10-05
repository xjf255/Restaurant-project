import { useContext, useEffect, useState } from 'react'
import './App.css'
import data from "./mocks/data.json"
import { Main } from './components/Main'
import { CartContext } from './context/cart'
import { IconCarbonNeutral, IconListCart, IconRemove } from './components/Icons'

function App() {

  const [pay, setPay] = useState(0)
  const { cart, removeToCart } = useContext(CartContext)

  useEffect(() => {
    setPay(0)
    data.map(el => {
      if (cart.includes(el.name)) {
        setPay(prevValue => prevValue + (el.price * cart.filter(ele => ele === el.name).length))
      }
    })
  }, [cart])

  return (
    <>
      <Main data={data} />
      <aside>
        <h2>Your Cart ({cart.length})</h2>
        {
          cart.length === 0
            ? <div className='cart--empty'>
              <IconListCart />
              <p>your added items will appear here</p>
            </ div>
            : <>
              {
                data.map(el => (
                  cart.includes(el.name) && <div key={el.name} className='cart--items'>
                    <div className="">
                      <h3>{el.name}</h3>
                      <span className='item__info'>
                        <p className="cuantity">{cart.filter(ele => ele === el.name).length}x</p>
                        <p className="unit__price">@${el.price}</p>
                        <p className="total__price">${el.price * cart.filter(ele => ele === el.name).length}</p>
                      </span>
                    </div>
                    <i onClick={() => removeToCart({item:el.name})} ><IconRemove /></i>
                  </ div>
                )
                )
              }
              <span className='total__pay'>
                <p>Order Total</p>
                <p className="total">${pay}</p>
              </span>
              <p className="ads">
                <IconCarbonNeutral />
                This is a <strong>carbon-neutral</strong> delivery
              </p>
              <button className='btn--confirm'>Confirm order</button>
            </>
        }
      </aside>
    </>
  )
}

export default App
