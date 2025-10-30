import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { validateEmail } from "../services/valideteEmail";
import { UserContext } from "../context/user";

const isLetters = (v) => /^[A-Za-zÀ-ÿ\s'.-]{2,}$/.test(v.trim());
const isDPI = (v) => /^\d{13}$/.test(v.trim());
const isPhone = (v) => /^\d{8}$/.test(v.trim());
const isPrefix = (v) => /^\+\d{1,4}$/.test(v.trim());
const isAddress = (v) => v.trim().length >= 5;
const isNIT = (v) => /^\d{1,12}-?[0-9K]$/i.test(v.trim());

export const Register = () => {
  const { addClient } = useContext(UserContext);
  const navigate = useNavigate();
  const formRef = useRef(null);
  const URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);

  const registerClick = (e) => {
    e.preventDefault();
    if (loading) return;

    const form = new FormData(formRef.current);

    const payload = {
      dpi: String(form.get("dpi") || "").replace(/\D/g, ""),
      nombre: String(form.get("nombre") || "").trim(),
      apellido: String(form.get("apellido") || "").trim(),
      direccion: String(form.get("direccion") || "").trim(),
      telefono: String(form.get("telefono") || "").replace(/\D/g, ""),
      prefijoTelefono: String(form.get("prefijoTelefono") || "").trim(),
      Email: String(form.get("email") || "").trim(),
      nit: String(form.get("nit") || "").toUpperCase().trim()
    };

    if (!payload.dpi || !payload.nombre || !payload.apellido || !payload.direccion ||
      !payload.telefono || !payload.prefijoTelefono || !payload.Email ||
      !payload.nit) {
      return toast.warning("Completa todos los campos obligatorios.");
    }

    if (!isDPI(payload.dpi)) {
      return toast.error("DPI inválido. Debe tener 13 dígitos.");
    }
    if (!isLetters(payload.nombre)) {
      return toast.error("Nombre inválido. Usa solo letras y mínimo 2 caracteres.");
    }
    if (!isLetters(payload.apellido)) {
      return toast.error("Apellido inválido. Usa solo letras y mínimo 2 caracteres.");
    }
    if (!isAddress(payload.direccion)) {
      return toast.error("Dirección inválida. Mínimo 5 caracteres.");
    }
    if (!isPrefix(payload.prefijoTelefono)) {
      return toast.error("Prefijo inválido. Ejemplo: +502");
    }
    if (!isPhone(payload.telefono)) {
      return toast.error("Teléfono inválido. Debe tener 8 dígitos.");
    }
    if (!validateEmail(payload.Email)) {
      return toast.error("Email no válido.");
    }
    if (!isNIT(payload.nit)) {
      return toast.error("NIT inválido. Ej: 1234567-8 o 1234567K");
    }

    const body = {
      dpi: payload.dpi,
      nombre: payload.nombre,
      apellido: payload.apellido,
      direccion: payload.direccion,
      telefono: payload.telefono,
      prefijoTelefono: payload.prefijoTelefono,
      correo: payload.Email,
      nit: payload.nit,
    };

    const submit = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${URL}/clientes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error("Error en la creación del usuario");

        toast.success("Usuario creado con éxito");
        const user = await res.json();
        addClient(user);
        navigate("/combos");
      } catch (err) {
        toast.error(err?.message || "No se pudo registrar");
      } finally {
        setLoading(false);
      }
    };
    submit();
  };

  return (
    <form ref={formRef} autoComplete="on" noValidate>
      <label>
        DPI*
        <input type="text" inputMode="numeric" name="dpi" placeholder="0000000000000" maxLength={13} />
      </label>

      <label>
        Nombre*
        <input type="text" name="nombre" placeholder="Ingrese su nombre..." />
      </label>

      <label>
        Apellido*
        <input type="text" name="apellido" placeholder="Ingrese su apellido..." />
      </label>

      <label>
        Dirección*
        <input type="text" name="direccion" placeholder="Calle/Avenida, zona..." />
      </label>

      <div style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: "8px" }}>
        <label>
          Prefijo*
          <input type="text" name="prefijoTelefono" defaultValue="+502" placeholder="+502" />
        </label>
        <label>
          Teléfono*
          <input type="text" inputMode="numeric" name="telefono" placeholder="12345678" maxLength={8} />
        </label>
      </div>

      <label>
        Email*
        <input type="email" name="email" placeholder="usuario@correo.com" />
      </label>

      <label>
        NIT*
        <input type="text" name="nit" placeholder="1234567-8 / 1234567K" />
      </label>

      <button type="submit" onClick={registerClick} disabled={loading}>
        {loading ? "Registrando..." : "Register"}
      </button>
    </form>
  );
};
