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

function Analytics() {

    const monthlyData = [
        {
            month: "Jan",
            income: 40000,
            expense: 18000,
        },
        {
            month: "Feb",
            income: 45000,
            expense: 22000,
        },
        {
            month: "Mar",
            income: 50000,
            expense: 20000,
        },
        {
            month: "Apr",
            income: 48000,
            expense: 25000,
        },
        {
            month: "May",
            income: 55000,
            expense: 23000,
        },
        {
            month: "Jun",
            income: 60000,
            expense: 17500,
        },
    ];

    return (
        <div className="analytics-page">

            <div className="page-header">
                <div>
                    <h1>Analytics</h1>
                    <p>
                        Understand your income and spending patterns.
                    </p>
                </div>
            </div>

            {/* Summary */}

            <div className="analytics-summary">

                <div className="analytics-card">
                    <p>Total Income</p>
                    <h2>₹3,18,000</h2>
                </div>

                <div className="analytics-card">
                    <p>Total Expenses</p>
                    <h2>₹1,35,500</h2>
                </div>

                <div className="analytics-card">
                    <p>Total Savings</p>
                    <h2>₹1,82,500</h2>
                </div>

            </div>


            {/* Chart */}

            <div className="analytics-chart-card">

                <h2>Income vs Expenses</h2>

                <div className="chart-container">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <BarChart data={monthlyData}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="month" />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Bar
                                dataKey="income"
                                name="Income"
                                fill="#4f46e5"
                            />

                            <Bar
                                dataKey="expense"
                                name="Expenses"
                                fill="#ef4444"
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>


            {/* Spending insight */}

            <div className="analytics-insight">

                <h2>Spending Overview</h2>

                <p>
                    Your expenses are currently lower than your
                    income. Keep tracking your spending to improve
                    your savings.
                </p>

            </div>

        </div>
    );
}

export default Analytics;