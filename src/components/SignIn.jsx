import { useContext, useRef, useState } from "react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/user"
import { EyeIcon } from "./EyeIcon"
import { EyeClosed } from "./EyeClosed"

export const SignIn = () => {
  const { addClient } = useContext(UserContext)
  const formRef = useRef()
  const URL = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const forgotPasswordClick = () => {
    navigate('/')
    toast.info("Lastimadamente no contamos con un sistema de recuperacion")
  }

  const signInClick = (e) => {
    e.preventDefault()
    const form = new FormData(formRef.current)
    const usuario = form.get("user")
    const password = form.get("password")
    if (usuario && usuario.trim() !== '' && password && password.trim() !== '') {
      const URL_AUTH = `${URL}/auth/log-in`
      const URL_USER = `${URL}/clientes/`
      const fetchData = async () => {
        try {
          const response = await fetch(URL_AUTH, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario, password })
          })
          if (!response.ok) {
            throw new Error('Usuario no encontrado')
          }
          const responseAuth = await response.json()
          const userResponse = await fetch(URL_USER + responseAuth.dpi,
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${responseAuth.token}`
          })
          const user = await userResponse.json()
          addClient(user)
          toast.success(`Bienvenid@ ${user.nombre} ${user.apellido}`)
          navigate('/combos')
        } catch (error) {
          toast.error(error.message)
        }
      }
      fetchData()
    } else {
      toast.warning("Llene todos los campos")
    }
  }


  return (
    <>
      <form ref={formRef}>
        <label>
          Usuario
          <input type="text" name="user" placeholder="Ingrese su identificacion..." value={undefined} />
        </label>
        <label>
          Contraseña
          <input type={showPassword ? "text" : "password"} name="password" placeholder="Ingrese su contraseña..." value={undefined} />
          <span onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
            {showPassword ? <EyeIcon /> : <EyeClosed />}
          </span>
        </label>
        <button type="submit" onClick={signInClick}>
          Sign in
        </button>
      </form>
      <span onClick={forgotPasswordClick}>
        <p className="password--recover">Olvidaste tu Identificador?</p>
      </span>
    </>
  )
}