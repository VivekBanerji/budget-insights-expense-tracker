import {
    FaWallet,
    FaArrowUp,
    FaArrowDown,
    FaPiggyBank,
} from "react-icons/fa";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

function Dashboard() {

    const monthlyData = [
        { month: "Jan", income: 45000, expense: 28000 },
        { month: "Feb", income: 50000, expense: 32000 },
        { month: "Mar", income: 48000, expense: 25000 },
        { month: "Apr", income: 55000, expense: 35000 },
        { month: "May", income: 60000, expense: 30000 },
        { month: "Jun", income: 58000, expense: 27000 },
    ];
    const budgetData = [
        { category: "Food", spent: 4500, budget: 6000 },
        { category: "Transport", spent: 2500, budget: 4000 },
        { category: "Shopping", spent: 3500, budget: 5000 },
        { category: "Bills", spent: 5000, budget: 6000 },
        { category: "Entertainment", spent: 2000, budget: 4000 },
    ];
    const transactions = [

        { date: "2026-10-05", title: "Grocery Store", category: "Food", amount: 2000, type: "Spend" },
        { date: "2026-10-05", title: "Salary Credit", category: "Salary", amount: 25000, type: "Credit" },
        { date: "2026-10-04", title: "Credit Card Bill", category: "Bills", amount: 3550, type: "Spend" },
        { date: "2026-10-04", title: "Petrol", category: "Transport", amount: 200, type: "Spend" },
        { date: "2026-10-03", title: "Phone Recharg", category: "Bills", amount: 699, type: "Spend" },
    ];

    return (
        <div className="dashboard">

            {/* Header */}
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Here's your financial overview</p>
            </div>

            {/* Summary Cards */}
            <div className="summary-cards">

                <div className="summary-card">
                    <div>
                        <p>Total Balance</p>
                        <h2>₹42,500</h2>
                    </div>
                    <FaWallet />
                </div>

                <div className="summary-card">
                    <div>
                        <p>Total Income</p>
                        <h2>₹60,000</h2>
                    </div>
                    <FaArrowUp />
                </div>

                <div className="summary-card">
                    <div>
                        <p>Total Expenses</p>
                        <h2>₹17,500</h2>
                    </div>
                    <FaArrowDown />
                </div>

                <div className="summary-card">
                    <div>
                        <p>Total Savings</p>
                        <h2>₹42,500</h2>
                    </div>
                    <FaPiggyBank />
                </div>

            </div>

            {/* Income Expense Chart */}
            <div className="chart-card">

                <div className="chart-header">
                    <h2>Income vs Expenses</h2>
                    <p>Monthly financial overview</p>
                </div>

                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={monthlyData}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip />

                        <Legend />

                        <Bar
                            dataKey="income"
                            name="Income"
                            fill="#4CAF50"
                        />

                        <Bar
                            dataKey="expense"
                            name="Expenses"
                            fill="#F44336"
                        />

                    </BarChart>
                </ResponsiveContainer>

            </div>
            {/* Budget Overview */}
            <div className="budget-card">

                <div className="chart-header">
                    <h2>Budget Overview</h2>
                    <p>Your spending against your budget</p>
                </div>

                {budgetData.map((item) => {

                    const percentage = (item.spent / item.budget) * 100;

                    return (
                        <div className="budget-item" key={item.category}>

                            <div className="budget-info">
                                <span>{item.category}</span>
                                <span>
                                    ₹{item.spent} / ₹{item.budget}
                                </span>
                            </div>

                            <div className="progress-bar">
                                <div
                                    className="progress"
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>

                        </div>
                    );
                })}

            </div>
            {/*Recent Transactions */}
            <div className="recent-transactions-card">
                <div className="chart-header">
                    <h2>Recent Transactions</h2>
                    <p>Your Recent Transactions</p>
                </div>
                {transactions.map((item) => {
                    return (
                        <div className="recent-transactions">
                            <div>
                                
                            </div>

                        </div>
                    )
                })}

            </div>

        </div>
    );
}

export default Dashboard;