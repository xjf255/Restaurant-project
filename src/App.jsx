import './App.css'
import { Header } from './components/Header'
import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
// import Dessets from './pages/Dessets'

export default function App() {

  const Dessets = lazy(() => import('./pages/Dessets'))
  const Coupons = lazy(() => import('./pages/Coupons'))

  return (
    <>
      <Header />
      <Suspense fallback={<h1>loading...</h1>} >
        <Routes>
          <Route path='/dessets' element={<Dessets />} />
          <Route path='/coupons' element={<Coupons />} />
        </Routes>
      </Suspense>
    </>
  )
}
