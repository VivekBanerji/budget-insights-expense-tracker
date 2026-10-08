import { FaUtensils, FaBus, FaShoppingBag, FaFileInvoice } from "react-icons/fa";

function Budget() {
    const budgets = [
        {
            id: 1,
            category: "Food",
            icon: <FaUtensils />,
            budget: 6000,
            spent: 4500,
        },
        {
            id: 2,
            category: "Transport",
            icon: <FaBus />,
            budget: 4000,
            spent: 2500,
        },
        {
            id: 3,
            category: "Shopping",
            icon: <FaShoppingBag />,
            budget: 5000,
            spent: 3500,
        },
        {
            id: 4,
            category: "Bills",
            icon: <FaFileInvoice />,
            budget: 6000,
            spent: 5000,
        },
    ];

    return (
        <div className="budget-page">

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
                    <h2>₹21,000</h2>
                </div>

                <div className="budget-summary-card">
                    <p>Total Spent</p>
                    <h2>₹15,500</h2>
                </div>

                <div className="budget-summary-card">
                    <p>Remaining</p>
                    <h2>₹5,500</h2>
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
                                            ₹{item.spent} of ₹{item.budget}
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
                                        width: `${percentage}%`,
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