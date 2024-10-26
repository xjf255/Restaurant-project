export function validarFormulario(form) {
  const tarjetaPattern = /^(\d{4}\s){3}\d{4}$/;
  const cvvPattern = /^\d{3}$/;
  const mesPattern = /^(0[1-9]|1[0-2])$/; // Mes en formato MM (01 a 12)
  const añoPattern = /^\d{4}$/; // Año en formato AAAA

  const numeroTarjeta = form.cardNumber.value.trim();
  const cvv = form.cvv.value.trim();
  const mes = form.month.value.trim();
  const año = form.year.value.trim();

  // Validar número de tarjeta
  if (!tarjetaPattern.test(numeroTarjeta)) {
    alert("El número de tarjeta debe tener el formato 1234 5678 9012 3456.");
    return false;
  }

  // Validar CVV
  if (!cvvPattern.test(cvv)) {
    alert("El CVV debe tener 3 dígitos.");
    return false;
  }

  // Validar mes
  if (!mesPattern.test(mes)) {
    alert("El mes debe estar entre 01 y 12.");
    return false;
  }

  // Validar año (opcional: puedes también verificar que el año sea igual o mayor al actual)
  if (!añoPattern.test(año)) {
    alert("El año debe tener 4 dígitos.");
    return false;
  }

  return true; // Todos los campos están correctos
}
