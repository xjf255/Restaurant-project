import {
  Box,
  Button,
  Divider,
  Fab,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { useState, useEffect } from "react"

const modalSx = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "92vw", sm: 520 },
  maxHeight: "88vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 2.5,
}

export const ConfigItem = ({ element, category }) => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({ ...element })
  const [saving, setSaving] = useState(false)
  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    setData({ ...element })
  }, [element])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const nombre = data?.nombre ?? ""
  const descripcion = data?.descripcion ?? ""
  const img = data?.img ?? ""
  const costo = data?.costo ?? ""

  const costoNumber =
    costo === "" ? "" : Number(String(costo).replace(",", "."))
  const costoError = costo !== "" && !Number.isFinite(costoNumber)

  const canSave = String(nombre).trim() !== "" && !costoError

  const handleSave = async () => {
    if (!canSave) return
    try {
      setSaving(true)

      const payload = {
        ...data,
        costo: costo === "" ? null : Number(costoNumber),
        category,
      }

      await onSave?.(payload)
      handleClose()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      setSaving(true)
      const removeItem = await fetch(`${API_URL}${category}/${element.id}`, {
        method: "DELETE",
      })
      if (!removeItem.ok) throw new Error("Error al eliminar el elemento")
      handleClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        onClick={handleOpen}
        sx={{ borderRadius: 2, textTransform: "none" }}
      >
        Editar
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="config-item-title"
      >
        <Box sx={modalSx}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 1 }}
          >
            <Box>
              <Typography id="config-item-title" variant="h6" fontWeight={700}>
                Editar elemento
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Categoría: {category ?? "—"}
              </Typography>
            </Box>

            <IconButton onClick={handleClose} aria-label="Cerrar">
            </IconButton>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <Stack spacing={2}>
            <TextField
              label="Nombre"
              value={nombre}
              onChange={(e) => setData({ ...data, nombre: e.target.value })}
              fullWidth
              size="small"
              autoFocus
            />

            <TextField
              label="Descripción"
              value={descripcion}
              onChange={(e) =>
                setData({ ...data, descripcion: e.target.value })
              }
              fullWidth
              size="small"
              multiline
              minRows={3}
            />

            <TextField
              label="Costo"
              value={costo}
              onChange={(e) => setData({ ...data, costo: e.target.value })}
              fullWidth
              size="small"
              inputMode="decimal"
              error={costoError}
              helperText={costoError ? "Ingresa un número válido" : " "}
            />

            <TextField
              label="Imagen (URL)"
              value={img}
              onChange={(e) => setData({ ...data, img: e.target.value })}
              fullWidth
              size="small"
              placeholder="https://..."
            />

            {String(img).trim() !== "" ? (
              <Box
                sx={{
                  mt: 1,
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >

                <img
                  src={img}
                  alt={nombre || "preview"}
                  style={{ width: "100%", display: "block", maxHeight: 220, objectFit: "cover" }}
                  onError={(e) => {
                    (e.currentTarget).style.display = "none"
                  }}
                />
              </Box>
            ) : null}
          </Stack>

          <Divider sx={{ my: 2.5 }} />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.2}
            justifyContent="flex-end"
          >
            <Button
              onClick={handleClose}
              variant="text"
              sx={{ textTransform: "none" }}
              disabled={saving}
            >
              Cancelar
            </Button>

            <Button
              onClick={handleDelete}
              variant="outlined"
              color="error"
              sx={{ borderRadius: 2, textTransform: "none" }}
              disabled={saving}
            >
              Eliminar
            </Button>

            <Fab
              variant="extended"
              color="primary"
              onClick={handleSave}
              disabled={!canSave || saving}
              sx={{ borderRadius: 2, boxShadow: 0, alignSelf: { xs: "stretch", sm: "auto" } }}
            >
              Guardar cambios
            </Fab>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}
