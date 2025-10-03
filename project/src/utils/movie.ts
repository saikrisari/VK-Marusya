export const getRatingClass = (rating: number) => {
  if (rating >= 8) return "gold";
  if (rating >= 7) return "green";
  if (rating >= 6) return "gray";
  return "red";
};

export const formatRuntime = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h} ч ${m} мин`;
  if (h > 0) return `${h} ч`;
  return `${m} мин`;
};

export const formatRub = (value: string): string => {
  if (!value) return " ";

  const reversed = value.split("").reverse();
  const groups: string[] = [];

  for (let i = 0; i < reversed.length; i += 3) {
    groups.push(reversed.slice(i, i + 3).join(""));
  }

  const formatted = groups
    .map((group) => group.split("").reverse().join(""))
    .reverse()
    .join(" ");

  return `${formatted} руб.`;
};

export const cutEndingDot = (str: string | null | undefined): string => {
  if (!str) return "";
  return str.endsWith(".") ? str.slice(0, -1) : str;
};
