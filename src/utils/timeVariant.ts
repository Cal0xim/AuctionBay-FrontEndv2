export function getTimeVariant(endDate: string): "last24h" | "default" {
  const now = Date.now();
  const end = new Date(endDate).getTime();

  const diffHours = (end - now) / (1000 * 60 * 60);

  if (diffHours <= 24) return "last24h";
  return "default";
}