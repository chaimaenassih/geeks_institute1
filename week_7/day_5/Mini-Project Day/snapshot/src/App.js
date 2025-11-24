import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Gallery from "./components/Gallery";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Redirection par défaut vers /mountain */}
          <Route path="/" element={<Navigate to="/mountain" replace />} />

          {/* 4 catégories */}
          <Route path="/mountain" element={<Gallery query="mountain" title="Mountain Pictures" />} />
          <Route path="/beaches" element={<Gallery query="beach" title="Beach Pictures" />} />
          <Route path="/birds" element={<Gallery query="birds" title="Bird Pictures" />} />
          <Route path="/food" element={<Gallery query="food" title="Food Pictures" />} />

          {/* Page de recherche dynamique */}
          <Route path="/search/:searchTerm" element={<Gallery isSearch />} />

          {/* 404 simple */}
          <Route path="*" element={<p style={{ textAlign: "center" }}>Page not found</p>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
