import { FaUtensils, FaBus, FaShoppingBag, FaFileInvoice } from "react-icons/fa";
import { useFinance } from "../context/FinanceContext";

function Budget() {
    const { transactions } = useFinance();
    const budgets = [
        {
            id: 1,
            category: "Food",
            icon: <FaUtensils />,
            budget: 6000,
            spent: transactions.filter((t) => t.category === "Food" && t.type === "Spend").reduce((sum, t) => sum + t.amount, 0),
        },
        {
            id: 2,
            category: "Transport",
            icon: <FaBus />,
            budget: 4000,
            spent: transactions.filter((t) => t.category === "Transport" && t.type === "Spend").reduce((sum, t) => sum + t.amount, 0),
        },
        {
            id: 3,
            category: "Shopping",
            icon: <FaShoppingBag />,
            budget: 5000,
            spent: transactions.filter((t) => t.category === "Shopping" && t.type === "Spend").reduce((sum, t) => sum + t.amount, 0),
        },
        {
            id: 4,
            category: "Bills",
            icon: <FaFileInvoice />,
            budget: 6000,
            spent: transactions.filter((t) => t.category === "Bills" && t.type === "Spend").reduce((sum, t) => sum + t.amount, 0),
        },
    ];

    const totalBudget = budgets.reduce((sum, item) => sum + item.budget, 0);
    const totalSpent = budgets.reduce((sum, item) => sum + item.spent, 0);
    const money = (value) => Number(value || 0).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

    return (
        <div className="budget-page page-enter">

            <div className="page-header">
                <div>
                    <h1>Budgets</h1>
                    <p>Track your spending against your monthly budgets.</p>
                </div>

                <button className="add-transaction-btn">
                    + Add Budget
                </button>
            </div>

            <div className="budget-summary">

                <div className="budget-summary-card">
                    <p>Total Budget</p>
                    <h2>{money(totalBudget)}</h2>
                </div>

                <div className="budget-summary-card">
                    <p>Total Spent</p>
                    <h2>{money(totalSpent)}</h2>
                </div>

                <div className="budget-summary-card">
                    <p>Remaining</p>
                    <h2>{money(totalBudget - totalSpent)}</h2>
                </div>

            </div>

            <div className="budget-list">

                {budgets.map((item) => {

                    const percentage =
                        (item.spent / item.budget) * 100;

                    return (
                        <div className="budget-card" key={item.id}>

                            <div className="budget-card-header">

                                <div className="budget-category">

                                    <div className="budget-icon">
                                        {item.icon}
                                    </div>

                                    <div>
                                        <h3>{item.category}</h3>
                                        <p>
                                            {money(item.spent)} of {money(item.budget)}
                                        </p>
                                    </div>

                                </div>

                                <span>
                                    {Math.round(percentage)}%
                                </span>

                            </div>

                            <div className="budget-progress">
                                <div
                                    className="budget-progress-fill"
                                    style={{
                                        width: `${Math.min(percentage, 100)}%`,
                                    }}
                                ></div>
                            </div>

                        </div>
                    );
                })}

            </div>

        </div>
    );
}

export default Budget;