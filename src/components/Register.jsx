import { useRef } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "sonner";
import { validateEmail } from "../services/valideteEmail";

export const Register = ({changeIsActive}) => {

  const navigate = useNavigate()
  const formRef = useRef()
  const URL = import.meta.env.VITE_USER_URL;

  const registerClick = (e) => {
    e.preventDefault();
    const form = new FormData(formRef.current);
    const email = form.get("email");
    const pass = form.get("password");
    const name = form.get("name");
    if (email && email.trim() !== '' && pass && pass.trim() !== '' && name && name.trim() !== '') {
      if (!validateEmail(email)) return toast.error("email not valid")
      const fetchData = async () => {
        try {
          const response = await fetch(URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "activo": true,
              "contrasena": pass,
              "correo": email,
              "id": "",
              "nombre": name,
              "rol": {
                "idRol": 2
              }
            })
          });
          if (!response.ok) {
            throw new Error('Error en la creación del usuario');
          }
          changeIsActive(true)
          navigate('/dessets');
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
    <form ref={formRef}>
      <label >
        Nombre
        <input type="text" placeholder="Ingrese su nombre..." name="name" />
      </label>
      <label>
        Email
        <input type="text" placeholder="Ingrese su correo..." name="email" />
      </label>
      <label>
        Password
        <input type="password" placeholder="Ingrese su contraseña..." name="password" />
      </label>
      <button type="submit" onClick={registerClick}>
        Register
      </button>
    </form>
  )
}