export function exportToCSV(data) {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);

  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((field) => `"${row[field]}"`).join(",")
    ),
  ].join("\n");

  downloadFile(csvContent, "transactions.csv", "text/csv");
}

export function exportToJSON(data) {
  if (!data || data.length === 0) return;

  const jsonContent = JSON.stringify(data, null, 2);

  downloadFile(jsonContent, "transactions.json", "application/json");
}

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}