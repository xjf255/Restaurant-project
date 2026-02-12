import { createContext, useState } from "react";

export const AdminContext = createContext({
  isAdmin: false,
  toggleAdmin: () => {}
})

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false)

  const toggleAdmin = () => {
    setIsAdmin(prev => !prev)
  }
  
  return (
    <AdminContext.Provider value={{ isAdmin, toggleAdmin }}>
      {children}
    </AdminContext.Provider>
  )
}
