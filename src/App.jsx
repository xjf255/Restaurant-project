import './styles/App.css'
import { Header } from './components/Header'
import { Navigate, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Loader } from './components/Loader'
import { Toaster } from 'sonner'
import { CartProvider } from './context/cart'
import Login from './pages/Login'
import { UserProvider } from './context/user'
import { AuthAdmin } from './components/AuthAdmin'
import { RequireAdmin } from './components/RequireAdmin'
import { AdminDashboard } from './components/AdminDashboard'

export default function App() {
  const MenuSection = lazy(() => import('./pages/MenuSection'))

  return (
    <CartProvider>
      <UserProvider>
        <Suspense fallback={<Loader />} >
          <Routes>
            <Route element={<Header />} >
              <Route path='/' element={<Navigate to={"combos"} />} />
              <Route path='/combos' element={<MenuSection />} />
              <Route path='/hamburguesas' element={<MenuSection />} />
              <Route path='/bebidas' element={<MenuSection />} />
              <Route path='/extras' element={<MenuSection />} />
            </Route>
            <Route path='/registration' element={<Login />} />
            <Route path="/admin/login" element={<AuthAdmin />} />
            <Route path="/admin"
              element={
                <RequireAdmin>
                  <AdminDashboard />
                </RequireAdmin>
              }
            />
          </Routes>
        </Suspense>
        <Toaster richColors />
      </UserProvider>
    </CartProvider>
  )
}
