const parseHistoricalDate = (kind, dateLabel) => {
  const value = String(dateLabel || "").trim();
  const match = kind === "fuel"
    ? value.match(/^(\d{2})\.(\d{2})\.(\d{4})(?:\s*\([^)]*\))?$/)
    : value.match(/^(\d{4})(?:\.(\d{2})\.(\d{2}))?$/);

  if (!match) return null;
  const year = Number(kind === "fuel" ? match[3] : match[1]);
  const month = Number(kind === "fuel" ? match[2] : match[2] || 1);
  const day = Number(kind === "fuel" ? match[1] : match[3] || 1);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;

  return { year: String(year), sortKey: year * 10000 + month * 100 + day };
};

module.exports = parseHistoricalDate;
