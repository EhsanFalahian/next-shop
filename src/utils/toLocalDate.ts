export function ToLocalDate(date: any) {
  const options: any = {
    // weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("fa-IR", options);
}
