export const validateEmail = (email) => {
  const dominiosPermitidos = ["@miumg.edu.gt", "@gmail.com"];
  const regex = new RegExp(`^[a-zA-Z0-9._%+-]+(${dominiosPermitidos.join('|')})$`);
  return regex.test(email);
};

