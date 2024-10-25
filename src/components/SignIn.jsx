import { useRef } from "react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { validateEmail } from "../services/valideteEmail"

export const SignIn = ({ changeIsActive }) => {
  const formRef = useRef()
  const navigate = useNavigate()

  const forgotPasswordClick = () => {
    alert("This is experimental")
  }

  const signInClick = (e) => {
    e.preventDefault();
    const form = new FormData(formRef.current);
    const email = form.get("email");
    const pass = form.get("password");
    if (email && email.trim() !== '' && pass && pass.trim() !== '') {
      if (!validateEmail(email)) return toast.error("email not valid")
      const URL = `http://20.121.130.161/grupo1/api/usuarios/login?contrasena=${pass}&correo=${email}`;
      const fetchData = async () => {
        try {
          const response = await fetch(URL);
          if (!response.ok) {
            throw new Error('Error en la obtencion de datos');
          }
          changeIsActive(true)
          navigate('/dessets');
        } catch (error) {
          formRef.current.reset()
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
          Email
          <input type="text" name="email" placeholder="Ingrese su correo..." value={undefined} />
        </label>
        <label>
          Password
          <input type="password" name="password" placeholder="Ingrese su contraseña..." value={undefined} />
        </label>
        <button type="submit" onClick={signInClick}>
          Sign in
        </button>
      </form>
      <span onClick={forgotPasswordClick}>
        <p className="password--recover">forgot password?</p>
      </span>
    </>
  )
}