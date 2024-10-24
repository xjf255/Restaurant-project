import './App.css'
import { Header } from './components/Header'
import { Route, Routes, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect, useState } from 'react'

export default function App() {

  const Dessets = lazy(() => import('./pages/Dessets'))
  const Coupons = lazy(() => import('./pages/Coupons'))
  const Login = lazy(() => import('./pages/Login'))

  const [activeHeader, setActiveHeader] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setActiveHeader(location.pathname !== '/')
  }, [location.pathname])
  return (
    <>
      {activeHeader && <Header />}
      <Suspense fallback={<h1>loading...</h1>} >
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dessets' element={<Dessets />} />
          <Route path='/coupons' element={<Coupons />} />
        </Routes>
      </Suspense>
    </>
  )
}
