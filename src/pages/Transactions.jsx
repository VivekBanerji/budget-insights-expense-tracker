import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaPlus, FaSearch, FaTrashAlt, FaTimes, FaFilter } from "react-icons/fa";
import { useFinance } from "../context/FinanceContext";

const categories = ["Food", "Transport", "Bills", "Shopping", "Salary", "Health", "Other"];
const money = (amount) => Number(amount || 0).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

function Transactions() {
  const { transactions, addTransaction, deleteTransaction, totalIncome, totalExpenses, balance } = useFinance();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [typeFilter, setTypeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [formData, setFormData] = useState({ title: "", amount: "", type: "Spend", category: "Food", date: new Date().toISOString().slice(0, 10) });
  const searchTerm = searchParams.get("search") || "";

  const filteredTransactions = useMemo(() => transactions.filter((item) => {
    const term = searchTerm.trim().toLowerCase();
    const matchesSearch = !term || [item.title, item.category, item.type, item.date, String(item.amount)].some((value) => String(value).toLowerCase().includes(term));
    const matchesType = typeFilter === "All" || (typeFilter === "Income" ? item.type === "Credit" : item.type === "Spend");
    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  }), [transactions, searchTerm, typeFilter, categoryFilter]);

  const updateForm = (event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const amount = Number(formData.amount);
    if (!formData.title.trim() || !Number.isFinite(amount) || amount <= 0 || !formData.date) return;
    addTransaction({ ...formData, id: Date.now(), title: formData.title.trim(), amount });
    setFormData({ title: "", amount: "", type: "Spend", category: "Food", date: new Date().toISOString().slice(0, 10) });
    setShowModal(false);
  };

  const clearFilters = () => { setSearchParams({}); setTypeFilter("All"); setCategoryFilter("All"); };

  return (
    <div className="transactions-page page-enter">
      <div className="page-heading-row">
        <div><span className="eyebrow">YOUR MONEY, IN CONTROL</span><h1>Transactions</h1><p>Track, search, and manage every income and expense.</p></div>
        <button className="primary-button" onClick={() => setShowModal(true)}><FaPlus /> Add transaction</button>
      </div>

      <div className="transaction-summary">
        <article className="metric-card metric-income"><span className="metric-label">Total income</span><strong>{money(totalIncome)}</strong><small>All recorded income</small></article>
        <article className="metric-card metric-expense"><span className="metric-label">Total expenses</span><strong>{money(totalExpenses)}</strong><small>All recorded spending</small></article>
        <article className="metric-card metric-balance"><span className="metric-label">Net balance</span><strong>{money(balance)}</strong><small>Income minus expenses</small></article>
      </div>

      <section className="content-card transactions-content">
        <div className="table-toolbar">
          <div><h2>All transactions</h2><p>{filteredTransactions.length} record{filteredTransactions.length === 1 ? "" : "s"} found</p></div>
          <div className="filter-controls">
            <label className="inline-search"><FaSearch /><input aria-label="Search transactions" value={searchTerm} onChange={(e) => setSearchParams(e.target.value ? { search: e.target.value } : {})} placeholder="Search transactions" /></label>
            <label className="select-filter"><FaFilter /><select aria-label="Filter by type" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}><option value="All">All types</option><option value="Income">Income</option><option value="Expense">Expense</option></select></label>
            <select aria-label="Filter by category" className="category-filter" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}><option value="All">All categories</option>{categories.map((category) => <option key={category}>{category}</option>)}</select>
            {(searchTerm || typeFilter !== "All" || categoryFilter !== "All") && <button className="text-button" onClick={clearFilters}>Clear</button>}
          </div>
        </div>

        <div className="table-scroll"><table className="transactions-table"><thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Type</th><th className="amount-cell">Amount</th><th className="action-cell">Action</th></tr></thead>
          <tbody>{filteredTransactions.length ? filteredTransactions.map((item) => <tr key={item.id}><td>{item.date}</td><td><span className="transaction-name">{item.title}</span></td><td><span className="category-chip">{item.category}</span></td><td><span className={item.type === "Spend" ? "expense-badge" : "income-badge"}>{item.type === "Spend" ? "Expense" : "Income"}</span></td><td className={`amount-cell ${item.type === "Spend" ? "amount-negative" : "amount-positive"}`}>{item.type === "Spend" ? "−" : "+"}{money(item.amount)}</td><td className="action-cell"><button className="icon-action danger-action" title={`Delete ${item.title}`} aria-label={`Delete ${item.title}`} onClick={() => { if (window.confirm(`Delete "${item.title}"?`)) deleteTransaction(item.id); }}><FaTrashAlt /></button></td></tr>) : <tr><td colSpan="6"><div className="empty-state"><span className="empty-icon"><FaSearch /></span><strong>No transactions found</strong><p>Try another search or clear your filters.</p><button className="secondary-button" onClick={clearFilters}>Clear filters</button></div></td></tr>}</tbody>
        </table></div>
      </section>

      {showModal && <div className="modal-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}><section className="transaction-modal modal-modern" role="dialog" aria-modal="true" aria-labelledby="transaction-modal-title"><div className="modal-header"><div><span className="eyebrow">RECORD YOUR MONEY</span><h2 id="transaction-modal-title">Add transaction</h2></div><button type="button" className="icon-action" aria-label="Close modal" onClick={() => setShowModal(false)}><FaTimes /></button></div>
        <form onSubmit={handleSubmit}><label htmlFor="transaction-title">Description</label><input id="transaction-title" name="title" value={formData.title} onChange={updateForm} placeholder="e.g. Monthly salary" required maxLength="80" />
          <div className="form-grid"><div><label htmlFor="transaction-amount">Amount (₹)</label><input id="transaction-amount" name="amount" type="number" min="0.01" step="0.01" value={formData.amount} onChange={updateForm} placeholder="0.00" required /></div><div><label htmlFor="transaction-type">Transaction type</label><select id="transaction-type" name="type" value={formData.type} onChange={updateForm}><option value="Spend">Expense</option><option value="Credit">Income</option></select></div></div>
          <div className="form-grid"><div><label htmlFor="transaction-category">Category</label><select id="transaction-category" name="category" value={formData.category} onChange={updateForm}>{categories.map((category) => <option key={category}>{category}</option>)}</select></div><div><label htmlFor="transaction-date">Date</label><input id="transaction-date" name="date" type="date" value={formData.date} onChange={updateForm} required /></div></div>
          <div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowModal(false)}>Cancel</button><button type="submit" className="primary-button"><FaPlus /> Save transaction</button></div>
        </form></section></div>}
    </div>
  );
}

export default Transactions;
