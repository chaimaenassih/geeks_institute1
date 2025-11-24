import React from "react";
import { useNavigate } from "react-router-dom";
import SearchForm from "./SearchForm";

function Layout({ children }) {
  const navigate = useNavigate();

  const handleSearch = (term) => {
    if (!term.trim()) return;
    navigate(`/search/${encodeURIComponent(term.trim())}`);
  };

  return (
    <div className="app-wrapper">
      <header className="header">
        <h1 className="logo">SnapShot</h1>

        <SearchForm onSearch={handleSearch} />

        <div className="nav-buttons">
          <button onClick={() => navigate("/mountain")}>Mountain</button>
          <button onClick={() => navigate("/beaches")}>Beaches</button>
          <button onClick={() => navigate("/birds")}>Birds</button>
          <button onClick={() => navigate("/food")}>Food</button>
        </div>
      </header>

      <main className="content">{children}</main>
    </div>
  );
}

export default Layout;
