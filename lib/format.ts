export function formatCompactNumber(num?: number | string) {
  const number = Number(num);
  if (Number.isNaN(number)) return "";

  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedNumber = formatter.format(number);

  return formattedNumber
    .replace(/(-*\d*\.*\d{0,2})\d*([A-Z|a-z]*)/g, "$1$2")
    .replace("k", " K")
    .replace("M", " M")
    .replace("B", " B");
}

export function formatPercentage(num?: number) {
  if (Number.isNaN(Number(num))) return "";

  // Convert num to a string with two decimal places
  const formattedNumString = typeof num === "number" ? num.toFixed(2) : "";

  return formattedNumString;
}
