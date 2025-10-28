import { Form, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ADMIN_USER = import.meta.env.VITE_ADMIN_USER ?? "";
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS ?? "";

export const AuthAdmin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isAdmin") === "true") {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const fd = new FormData(e.currentTarget);
    const username = String(fd.get("username") || "").trim();
    const password = String(fd.get("password") || "");

    if (!username || !password) {
      setError("Ingresa usuario y contraseña.");
      return;
    }

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin", { replace: true });
    } else {
      setError("Credenciales inválidas.");
    }
  };

  return (
    <Form method="post" onSubmit={handleSubmit} className="authAdmin">
      <h2 className="authAdmin__title">Acceso de Administrador</h2>

      <label className="authAdmin__label">
        Usuario
        <input
          className="authAdmin__input"
          type="text"
          name="username"
          placeholder="admin"
          autoComplete="username"
        />
      </label>

      <label className="authAdmin__label">
        Contraseña
        <input
          className="authAdmin__input"
          type="password"
          name="password"
          placeholder="•••••••"
          autoComplete="current-password"
        />
      </label>

      {error && <p className="authAdmin__error">{error}</p>}

      <button type="submit" className="authAdmin__btn">Ingresar</button>
    </Form>
  );
};
