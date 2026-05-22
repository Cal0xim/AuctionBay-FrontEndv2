export function formatTime(endDate: string) {
  const now = new Date().getTime();
  const end = new Date(endDate).getTime();

  const diff = end - now;

  if (diff <= 0) return "";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  if (days > 0) {
    return `${days}d ${remainingHours}h`;
  }

  return `${hours}h`;
}