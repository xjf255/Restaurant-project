import { createContext, useState } from "react";

export const AdminContext = createContext({
  isAdmin: false,
  token: null,
  toggleAdmin: () => { }
})

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [token, setToken] = useState(null)

  const toggleAdmin = () => {
    setIsAdmin(prev => !prev)
  }

  const setAdminToken = (token) => {
    setToken(token)
  }

  return (
    <AdminContext.Provider value={{ isAdmin, toggleAdmin, token, setAdminToken }}>
      {children}
    </AdminContext.Provider>
  )
}
