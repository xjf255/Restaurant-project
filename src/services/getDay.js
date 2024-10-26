export default function getDay () {
  const today = new Date();
  return today.toISOString().split('T')[0]; // Returns in "yyyy-MM-dd" format
};
