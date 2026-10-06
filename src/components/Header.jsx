import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";

function Header() {
  return (
    <header className="header">
      <div className="search-box">
        <FaSearch />
        <input type="text" placeholder="Search..." />
      </div>

      <div className="header-actions">
        <button className="icon-button">
          <FaBell />
        </button>

        <div className="profile">
          <FaUserCircle />
          <div>
            <strong>Vivek</strong>
            <span>Personal Account</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;