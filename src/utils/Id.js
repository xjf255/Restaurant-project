export const getIdentifier = (category, data) => {
  if (category === "bebidas") {
    return [data.nombre, data.costo].join("-").toLowerCase()
  }
  if (category === "combos") {
    return data.numCombo.toString()
  }
  return data.nombre.toLowerCase()
}