export const getId = (category, data) => {
  if (category === "bebidas") {
    return [data.nombre, data.cantidad].join("/").toLowerCase()
  }
  if (category === "combos") {
    return data.numCombo.toString()
  }
  return data.nombre.toLowerCase()
}