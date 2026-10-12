import { createContext, useContext, useEffect, useState } from "react";

const FinanceContext = createContext(null);

const initialTransactions = [
  { id: 5, date: "2026-10-05", title: "Grocery Store", category: "Food", amount: 2000, type: "Spend" },
  { id: 4, date: "2026-10-05", title: "Salary Credit", category: "Salary", amount: 25000, type: "Credit" },
  { id: 3, date: "2026-10-04", title: "Credit Card Bill", category: "Bills", amount: 3550, type: "Spend" },
  { id: 2, date: "2026-10-04", title: "Petrol", category: "Transport", amount: 200, type: "Spend" },
  { id: 1, date: "2026-10-03", title: "Phone Recharge", category: "Bills", amount: 699, type: "Spend" },
];

function readTransactions() {
  try {
    const saved = localStorage.getItem("budget-insights-transactions");
    return saved ? JSON.parse(saved) : initialTransactions;
  } catch {
    return initialTransactions;
  }
}

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(readTransactions);

  useEffect(() => {
    localStorage.setItem("budget-insights-transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions((current) => [transaction, ...current]);
  };

  const deleteTransaction = (id) => {
    setTransactions((current) => current.filter((item) => item.id !== id));
  };

  const totalIncome = transactions
    .filter((item) => item.type === "Credit")
    .reduce((sum, item) => sum + Number(item.amount), 0);
  const totalExpenses = transactions
    .filter((item) => item.type === "Spend")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  return (
    <FinanceContext.Provider value={{ transactions, setTransactions, addTransaction, deleteTransaction, totalIncome, totalExpenses, balance: totalIncome - totalExpenses }}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) throw new Error("useFinance must be used inside FinanceProvider");
  return context;
}
