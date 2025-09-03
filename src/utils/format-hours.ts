export const formatHours = (date: string | Date) => {
  const parsed: Date = typeof date === "string" ? new Date(date) : date;

  return parsed.toLocaleString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
