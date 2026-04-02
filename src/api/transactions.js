const BASE_URL = "http://localhost:3001/transactions";

export async function fetchTransactions() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function addTransactionAPI(txn) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(txn),
  });
  return res.json();
}

export async function deleteTransactionAPI(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}