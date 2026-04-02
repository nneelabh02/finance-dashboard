import { create } from "zustand";

const API_URL = "http://localhost:3000";

export const useFinanceStore = create((set) => ({
  transactions: [],
  search: "",
  sortBy: "date",
  role: "admin",
  loading: false,
  error: null,

  setSearch: (val) => set({ search: val }),
  setSort: (val) => set({ sortBy: val }),
  setRole: (val) => set({ role: val }),

  // FETCH
  loadTransactions: async () => {
    try {
      set({ loading: true, error: null });

      const res = await fetch(`${API_URL}/transactions`);
      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();

      set({
        transactions: data,
        loading: false,
      });
    } catch (err) {
      console.error(err);
      set({
        error: "Failed to fetch transactions",
        loading: false,
      });
    }
  },

  // ADD
  addTransaction: async (tx) => {
    try {
      const res = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tx),
      });

      const data = await res.json();

      set((state) => ({
        transactions: [data, ...state.transactions],
      }));
    } catch (err) {
      console.error(err);
    }
  },

  // DELETE
  deleteTransaction: async (id) => {
    try {
      await fetch(`${API_URL}/transactions/${id}`, {
        method: "DELETE",
      });

      set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id),
      }));
    } catch (err) {
      console.error(err);
    }
  },
}));