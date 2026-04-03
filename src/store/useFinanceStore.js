import { create } from "zustand";

// Static transaction data for demo purposes
const mockTransactions = [
  {
    "amount": 50000,
    "category": "Salary",
    "type": "income",
    "date": "2026-04-30",
    "id": "IrNUL81d4LA"
  },
  {
    "amount": 25000,
    "category": "Home Loan",
    "type": "expense",
    "date": "2026-05-02",
    "id": "1zoApsPOwpA"
  },
  {
    "amount": 2000,
    "category": "Internet",
    "type": "expense",
    "date": "2026-05-02",
    "id": "GtmxM0Ur9Jo"
  },
  {
    "amount": 2478,
    "category": "Clothes",
    "type": "expense",
    "date": "2026-04-14",
    "id": "kxVRV79jDBw"
  },
  {
    "amount": 78000,
    "category": "Recieved",
    "type": "income",
    "date": "2026-04-29",
    "id": "cRbGw2xAqf4"
  }
];

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

  // LOAD STATIC DATA (no API call needed)
  loadTransactions: async () => {
    try {
      set({ loading: true, error: null });

      // Simulate network delay for realistic loading experience
      await new Promise(resolve => setTimeout(resolve, 500));

      set({
        transactions: mockTransactions,
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

  // ADD (simulate adding to local state)
  addTransaction: async (tx) => {
    try {
      set({ loading: true });

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Generate a simple ID for the new transaction
      const newTx = { ...tx, id: Date.now().toString() };

      set((state) => ({
        transactions: [newTx, ...state.transactions],
        loading: false,
      }));
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },

  // DELETE (simulate removing from local state)
  deleteTransaction: async (id) => {
    try {
      set({ loading: true });

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));

      set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id),
        loading: false,
      }));
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },
}));