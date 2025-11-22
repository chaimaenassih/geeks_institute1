import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import ErrorBoundary from "./ErrorBoundary";
import PostList from "./Components/PostList";
import Example1 from "./Components/Example1";
import Example2 from "./Components/Example2";
import Example3 from "./Components/Example3";
import WebhookDemo from "./Components/WebhookDemo";

/* --------- Exercice 1 : écrans router --------- */

function HomeScreen() {
  return (
    <div className="card m-3 p-4">
      <div className="mb-3">
        <NavLink className="btn btn-primary me-2" to="/">
          Home
        </NavLink>
        <NavLink className="btn btn-outline-primary me-2" to="/profile">
          Profile
        </NavLink>
        <NavLink className="btn btn-outline-primary" to="/shop">
          Shop
        </NavLink>
      </div>
      <h1>Home</h1>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="card m-3 p-4">
      <div className="mb-3">
        <NavLink className="btn btn-outline-primary me-2" to="/">
          Home
        </NavLink>
        <NavLink className="btn btn-primary me-2" to="/profile">
          Profile
        </NavLink>
        <NavLink className="btn btn-outline-primary" to="/shop">
          Shop
        </NavLink>
      </div>
      <h1>Profile Screen</h1>
    </div>
  );
}

function ShopScreen() {
  throw new Error("ShopScreen crashed");
}

function ShopScreenWrapper() {
  return (
    <div className="card m-3 p-4">
      <div className="mb-3">
        <NavLink className="btn btn-outline-primary me-2" to="/">
          Home
        </NavLink>
        <NavLink className="btn btn-outline-primary me-2" to="/profile">
          Profile
        </NavLink>
        <NavLink className="btn btn-primary" to="/shop">
          Shop
        </NavLink>
      </div>
      <ShopScreen />
    </div>
  );
}


function PostsScreen() {
  return (
    <div className="container mt-3">
      <h2>Exercise 2 : Posts</h2>
      <PostList />
    </div>
  );
}

function ExamplesScreen() {
  return (
    <div className="container mt-3">
      <Example1 />
      <Example2 />
      <Example3 />
    </div>
  );
}

/* ------------------- App ------------------- */

function App() {
  return (
    <BrowserRouter>
      {/* Navbar bootstrap principale pour naviguer entre tous les exos */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <NavLink className="navbar-brand" to="/">
          React Exercises
        </NavLink>
        <div className="navbar-nav">
          <NavLink className="nav-link" to="/">
            Router Demo
          </NavLink>
          <NavLink className="nav-link" to="/posts">
            Posts
          </NavLink>
          <NavLink className="nav-link" to="/examples">
            JSON Examples
          </NavLink>
          <NavLink className="nav-link" to="/webhook">
            Webhook
          </NavLink>
        </div>
      </nav>

      <Routes>
        {/* Exercice 1 */}
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <HomeScreen />
            </ErrorBoundary>
          }
        />
        <Route
          path="/profile"
          element={
            <ErrorBoundary>
              <ProfileScreen />
            </ErrorBoundary>
          }
        />
        <Route
          path="/shop"
          element={
            <ErrorBoundary>
              <ShopScreenWrapper />
            </ErrorBoundary>
          }
        />

        {/* Exercice 2 */}
        <Route path="/posts" element={<PostsScreen />} />

        {/* Exercice 3 */}
        <Route path="/examples" element={<ExamplesScreen />} />

        {/* Exercice 4 */}
        <Route path="/webhook" element={<WebhookDemo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
