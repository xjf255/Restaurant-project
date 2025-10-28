import './styles/App.css'
import { Header } from './components/Header'
import { Navigate, Route, Routes } from 'react-router-dom'
import { lazy, Suspense, useState } from 'react'
import { Loader } from './components/Loader'
import { Toaster } from 'sonner'
import ProtectedRoutes from './components/ProtectedRoutes'
import { CartProvider } from './context/cart'

export default function App() {

  const MenuSection = lazy(() => import('./pages/MenuSection'))
  const Coupons = lazy(() => import('./pages/Coupons'))
  const Invoice = lazy(() => import('./pages/Invoice'))

  const [isActive, setIsActive] = useState(false)

  return (
    <CartProvider>
      {!isActive && <Header />}
      <Suspense fallback={<Loader />} >
        <Routes>
          <Route path='/' element={<Navigate to={"Promociones"} />} />
          <Route path='/promociones' element={<MenuSection />} />
          <Route path='/combos' element={<MenuSection />} />
          <Route path='/hamburguesas' element={<MenuSection />} />
          <Route path='/bebidas' element={<MenuSection />} />
          <Route path='/extras' element={<MenuSection />} />
          <Route element={<ProtectedRoutes canActive={isActive} />}>
            <Route path='/dashboard' element={<Coupons />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster richColors />
    </CartProvider>
  )
}
