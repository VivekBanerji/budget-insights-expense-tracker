import "../App.css";

function Transactions() {
    const transactions = [
        { id: 5, date: "2026-10-05", title: "Grocery Store", category: "Food", amount: 2000, type: "Spend" },
        { id: 4, date: "2026-10-05", title: "Salary Credit", category: "Salary", amount: 25000, type: "Credit" },
        { id: 3, date: "2026-10-04", title: "Credit Card Bill", category: "Bills", amount: 3550, type: "Spend" },
        { id: 2, date: "2026-10-04", title: "Petrol", category: "Transport", amount: 200, type: "Spend" },
        { id: 1, date: "2026-10-03", title: "Phone Recharg", category: "Bills", amount: 699, type: "Spend" },
    ];

    return (
        <div className="transactions-page">
            <div className="transactions-header">
                <h1>Transactions</h1>
                <p>Manage all your income and expense records.</p>
            </div>

            <div className="transactions-table-container">
                <table className="transactions-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map((item) => (
                            <tr key={item.id}>
                                <td>{item.date}</td>
                                <td>{item.title}</td>
                                <td>{item.category}</td>
                                <td>{item.type}</td>
                                <td>
                                    <span className={item.type === "Spend" ? "expense-badge" : "income-badge"}>
                                        {item.type === "Spend" ? "Expense" : "Income"}
                                    </span>
                                </td>
                                <td>
                                    <button className="edit">Edit</button>
                                    <button className="delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Transactions;