export const formatCurrency = (amount, decimals) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: decimals,
  }).format(amount);
};
