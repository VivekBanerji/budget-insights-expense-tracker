import { NavLink } from "react-router-dom";
import {
    FaChartPie,
    FaExchangeAlt,
    FaWallet,
    FaChartLine,
    FaCog,
} from "react-icons/fa";

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <FaWallet />
                <span>Budget Insights</span>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/" end>
                    <FaChartPie />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/transactions">
                    <FaExchangeAlt />
                    <span>Transactions</span>
                </NavLink>

                <NavLink to="/budgets">
                    <FaWallet />
                    <span>Budgets</span>
                </NavLink>

                <NavLink to="/analytics">
                    <FaChartLine />
                    <span>Analytics</span>
                </NavLink>

                <NavLink to="/settings">
                    <FaCog />
                    <span>Settings</span>
                </NavLink>
            </nav>
        </aside>
    );
}

export default Sidebar;