import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { useState } from "react"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const ConfigItem = ({ element, category }) => {
  console.log("ConfigItem element:", element);
  console.log("ConfigItem category:", category);
  const [data, setData] = useState({...element})
  const { numCombo, nombre, img, descripcion, costo } = data
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Button className="edit__btn" onClick={handleOpen}>Editar</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField id="standard-basic" label="Nombre" variant="standard" value={nombre} onChange={(e) => setData({...data, nombre: e.target.value})} />
          <TextField id="standard-basic" label="Descripción" variant="standard" value={descripcion} onChange={(e) => setData({...data, descripcion: e.target.value})} />
          <TextField id="standard-basic" label="Costo" variant="standard" value={costo} onChange={(e) => setData({...data, costo: e.target.value})} />
          <TextField id="standard-basic" label="Imagen" variant="standard" value={img} onChange={(e) => setData({...data, img: e.target.value})} />
        </Box>
      </Modal></>
  )
}