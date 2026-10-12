import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get("search") || "");
  }, [location.pathname, location.search]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);
    const params = new URLSearchParams();
    if (value.trim()) params.set("search", value);
    navigate({ pathname: "/transactions", search: params.toString() ? `?${params}` : "" });
  };

  return (
    <header className="header">
      <label className="search-box" aria-label="Search transactions">
        <FaSearch />
        <input value={query} onChange={handleSearch} placeholder="Search transactions..." />
        {query && <button type="button" className="search-clear" onClick={() => { setQuery(""); navigate("/transactions"); }} aria-label="Clear search">×</button>}
      </label>
      <div className="header-actions">
        <button className="icon-button" type="button" title="Notifications" onClick={() => navigate("/settings")}><FaBell /></button>
        <button className="profile profile-button" type="button" onClick={() => navigate("/profile")}>
          <FaUserCircle />
          <span><strong>Vivek</strong><small>Personal Account</small></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
