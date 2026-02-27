import { useContext, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/user"
import { EyeIcon } from "./EyeIcon"
import { EyeClosed } from "./EyeClosed"
import { AdminContext } from "../context/admin"

export const SignIn = () => {
  const { addClient } = useContext(UserContext)
  const { isAdmin, toggleAdmin, setAdminToken } = useContext(AdminContext)
  const formRef = useRef()
  const API_URL = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin", { replace: true });
    }
  }, [navigate, isAdmin]);

  const forgotPasswordClick = () => {
    navigate("/")
    toast.info("Lamentablemente no contamos con un sistema de recuperación.")
  }

  const signInSubmit = async (e) => {
    e.preventDefault()
    if (!formRef.current) return

    const form = new FormData(formRef.current)
    const usuario = String(form.get("user") ?? "").trim()
    const password = String(form.get("password") ?? "").trim()

    if (!usuario || !password) {
      toast.warning("Llene todos los campos")
      return
    }

    const URL_AUTH = `${API_URL}/auth/log-in`

    setLoading(true)
    try {
      const response = await fetch(URL_AUTH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password }),
      })

      if (!response.ok) {
        throw new Error("Usuario o contraseña inválidos")
      }

      const responseAuth = await response.json()
      const { token, dpi, isAdmin } = responseAuth
      setAdminToken(isAdmin ? token : null)
      const userResponse = await fetch(`${API_URL}/clientes/${encodeURIComponent(dpi)}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!userResponse.ok) {
        throw new Error("No se pudo obtener la información del usuario")
      }

      const user = await userResponse.json()
      addClient(user)

      if (isAdmin) {
        toggleAdmin()
        navigate("/admin", { replace: true });
      } else {
        navigate("/combos")
      }

      toast.success(`Bienvenid@ ${user.nombre} ${user.apellido}`)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Ocurrió un error inesperado"
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form ref={formRef} onSubmit={signInSubmit}>
        <label>
          Usuario
          <input type="text" name="user" placeholder="Ingrese su usuario..." autoComplete="username" />
        </label>

        <label>
          Contraseña
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Ingrese su contraseña..."
            autoComplete="current-password"
          />
          <span
            onClick={() => setShowPassword((show) => !show)}
            style={{ cursor: "pointer" }}
            role="button"
            tabIndex={0}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <EyeIcon /> : <EyeClosed />}
          </span>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Sign in"}
        </button>
      </form>

      <button type="button" onClick={forgotPasswordClick} className="password--recover">
        Olvidaste tu Identificador?
      </button>
    </>
  )
}
