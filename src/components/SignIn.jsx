import { useContext, useRef } from "react"
import { toast, Toaster } from "sonner"
import { useNavigate } from "react-router-dom"
import { validateEmail } from "../services/valideteEmail"
import { UserContext } from "../context/user"

export const SignIn = () => {
  const { addClient } = useContext(UserContext)
  const formRef = useRef()
  const URL_CLIENT = import.meta.env.VITE_USER_URL
  const navigate = useNavigate()

  const forgotPasswordClick = () => {
    navigate('/');
    toast.info("Lastimadamente no contamos con un sistema de recuperacion")
  }

  const signInClick = (e) => {
    e.preventDefault();
    const form = new FormData(formRef.current);
    const ide = form.get("identificacion")
    if (ide && ide.trim() !== '') {
      const URL = `${URL_CLIENT}/${ide.trim()}`;
      const fetchData = async () => {
        try {
          const response = await fetch(URL);
          if (!response.ok) {
            throw new Error('Usuario no encontrado');
          }
          const user = await response.json();
          addClient(user);
          toast.success(`Bienvenid@ ${user.nombre} ${user.apellido}`);
          navigate('/promociones');
        } catch (error) {
          toast.error(error.message);
        }
      };
      fetchData();
    } else {
      toast.warning("Llene todos los campos");
    }
  };


  return (
    <>
      <form ref={formRef}>
        <label>
          Dpi | CUI
          <input type="text" name="identificacion" placeholder="Ingrese su identificacion..." value={undefined} />
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