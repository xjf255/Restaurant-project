import { createContext, useState } from "react";

export const UserContext = createContext({
  client : null,
  addClient: (client) => {},
  removeClient: () => {}
})

export const UserProvider = ({ children }) => {

    const [client, setClient] = useState(null)
  
    const addClient = (client) => {
      setClient(client)
    }

    const removeClient = () => {
      setClient(null)
    }

    const value = {
      client,
      addClient,
      removeClient
    }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}