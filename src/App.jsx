import './App.css'
import { Header } from './components/Header'
import { Route, Routes } from 'react-router-dom'
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
      {isActive && <Header />}
      <Suspense fallback={<Loader />} >
        <Routes>
          <Route path='/' element={<Login setIsActive={setIsActive} />} />
          <Route element={<ProtectedRoutes canActive={isActive} />}>
            <Route path='/dessets' element={<Dessets />} />
            <Route path='/coupons' element={<Coupons />} />
            <Route path='/invoices' element={<Invoice />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster richColors />
    </>
  )
}
