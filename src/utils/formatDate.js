const options = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};


export const formatDate = datetime => {
  let date = new Date(datetime)
  return date.toLocaleDateString('es', options)
}