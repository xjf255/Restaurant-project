import './styles/App.css'
import { Header } from './components/Header'
import { Navigate, Route, Routes } from 'react-router-dom'
import { lazy, Suspense, useState } from 'react'
import { Loader } from './components/Loader'
import { Toaster } from 'sonner'
import ProtectedRoutes from './components/ProtectedRoutes'

export default function App() {

  const Dessets = lazy(() => import('./pages/Dessets'))
  const Coupons = lazy(() => import('./pages/Coupons'))
  const Login = lazy(() => import('./pages/Login'))
  const Invoice = lazy(() => import('./pages/Invoice'))

  const [isActive, setIsActive] = useState(false)

  return (
    <>
      {!isActive && <Header />}
      <Suspense fallback={<Loader />} >
        <Routes>
          <Route path='/' element={<Navigate to={"Promociones"}/>} />
          <Route path='/promociones' element={<Dessets />} />
          <Route path='/combos' element={<Dessets />} />
          <Route path='/hamburguesas' element={<Dessets />} />
          <Route path='/bebidas' element={<Dessets />} />
          <Route path='/extras' element={<Dessets />} />
          <Route element={<ProtectedRoutes canActive={isActive} />}>
            <Route path='/dashboard' element={<Coupons />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster richColors />
    </>
  )
}
