import { useState } from "react";

function Transactions() {
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState([
    {
      id: 5,
      date: "2026-10-05",
      title: "Grocery Store",
      category: "Food",
      amount: 2000,
      type: "Spend",
    },
    {
      id: 4,
      date: "2026-10-05",
      title: "Salary Credit",
      category: "Salary",
      amount: 25000,
      type: "Credit",
    },
    {
      id: 3,
      date: "2026-10-04",
      title: "Credit Card Bill",
      category: "Bills",
      amount: 3550,
      type: "Spend",
    },
    {
      id: 2,
      date: "2026-10-04",
      title: "Petrol",
      category: "Transport",
      amount: 200,
      type: "Spend",
    },
    {
      id: 1,
      date: "2026-10-03",
      title: "Phone Recharge",
      category: "Bills",
      amount: 699,
      type: "Spend",
    },
  ]);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "Spend",
    category: "Food",
    date: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Add transaction
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Date.now(),
      title: formData.title,
      amount: Number(formData.amount),
      type: formData.type,
      category: formData.category,
      date: formData.date,
    };

    setTransactions([newTransaction, ...transactions]);

    // Reset form
    setFormData({
      title: "",
      amount: "",
      type: "Spend",
      category: "Food",
      date: "",
    });

    // Close modal
    setShowModal(false);
  };

  // Calculate totals

  const totalIncome = transactions
    .filter((item) => item.type === "Credit")
    .reduce((total, item) => total + item.amount, 0);

  const totalExpenses = transactions
    .filter((item) => item.type === "Spend")
    .reduce((total, item) => total + item.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="transactions-page">

      <div className="transactions-header">
        <div>
          <h1>Transactions</h1>
          <p>Manage all your income and expense records.</p>
        </div>

        <button
          className="add-transaction-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Transaction
        </button>
      </div>

      {/* ---------------- SUMMARY CARDS ---------------- */}

      <div className="transaction-summary">

        <div className="transaction-summary-card">
          <p>Total Income</p>
          <h2>₹{totalIncome}</h2>
        </div>

        <div className="transaction-summary-card">
          <p>Total Expenses</p>
          <h2>₹{totalExpenses}</h2>
        </div>

        <div className="transaction-summary-card">
          <p>Balance</p>
          <h2>₹{balance}</h2>
        </div>

      </div>

      {/* ---------------- TABLE ---------------- */}

      <div className="transactions-table-container">
        <table className="transactions-table">

          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>

            {transactions.map((item) => (
              <tr key={item.id}>

                <td>{item.date}</td>

                <td>{item.title}</td>

                <td>{item.category}</td>

                <td>
                  <span
                    className={
                      item.type === "Spend"
                        ? "expense-badge"
                        : "income-badge"
                    }
                  >
                    {item.type === "Spend"
                      ? "Expense"
                      : "Income"}
                  </span>
                </td>

                <td>
                  {item.type === "Spend" ? "-" : "+"}
                  ₹{item.amount}
                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>

      {/* ---------------- MODAL ---------------- */}

      {showModal && (
        <div className="modal-overlay">

          <div className="transaction-modal">

            <div className="modal-header">

              <h2>Add Transaction</h2>

              <button
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              {/* Title */}
              <label>Title</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
                required
              />

              {/* Amount */}
              <label>Amount</label>

              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                required
              />

              {/* Type */}
              <label>Type</label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Spend">Expense</option>
                <option value="Credit">Income</option>
              </select>

              {/* Category */}
              <label>Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Food">Food</option>
                <option value="Transport">
                  Transport
                </option>
                <option value="Bills">Bills</option>
                <option value="Shopping">
                  Shopping
                </option>
                <option value="Salary">Salary</option>
              </select>

              {/* Date */}
              <label>Date</label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />

              {/* Buttons */}
              <div className="modal-actions">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit">
                  Add Transaction
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Transactions;