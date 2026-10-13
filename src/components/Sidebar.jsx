import { NavLink } from "react-router-dom";
import { FaChartPie, FaExchangeAlt, FaWallet, FaChartLine, FaCog, FaUserCircle, FaCalendarAlt, FaReceipt, FaMoneyBillWave, FaRobot } from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo"><span className="brand-mark"><FaWallet /></span><span>Budget Insights</span></div>
      <div className="sidebar-section-label">WORKSPACE</div>
      <nav className="sidebar-nav">
        <NavLink to="/" end><FaChartPie /><span>Dashboard</span></NavLink>
        <NavLink to="/transactions"><FaExchangeAlt /><span>Transactions</span></NavLink>
        <NavLink to="/budgets"><FaWallet /><span>Budgets</span></NavLink>
        <NavLink to="/analytics"><FaChartLine /><span>Analytics</span></NavLink>
        <NavLink to="/calendar"><FaCalendarAlt /><span>Spending calendar</span></NavLink>
        <NavLink to="/loans"><FaMoneyBillWave /><span>Loans & EMIs</span></NavLink>
        <NavLink to="/receipts"><FaReceipt /><span>Bill scanner</span></NavLink>
        <NavLink to="/coach"><FaRobot /><span>AI money coach</span></NavLink>
      </nav>
      <div className="sidebar-section-label sidebar-bottom-label">PREFERENCES</div>
      <nav className="sidebar-nav">
        <NavLink to="/profile"><FaUserCircle /><span>My profile</span></NavLink>
        <NavLink to="/settings"><FaCog /><span>Settings</span></NavLink>
      </nav>
      <div className="sidebar-bottom-card"><div className="sidebar-bottom-icon">₹</div><div><strong>Build better habits</strong><span>Small steps add up.</span></div></div>
    </aside>
  );
}

export default Sidebar;
