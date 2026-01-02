import { useState } from "react";
import { DataFetcher } from "./components/DataFetcher";
import type { MealsResponse } from "./types/types";


export default function App() {
  const [search, setSearch] = useState("chicken");

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(search)}`;
  const cacheKey = `recipes:${search}`;

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 16, fontFamily: "system-ui, Arial" }}>
     
      <label style={{ display: "block", marginBottom: 12 }}>
        Search:{" "}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 8, width: 280 }}
        />
      </label>

      <DataFetcher<MealsResponse>
        cacheKey={cacheKey}
        url={url}
        renderLoading={() => <p>Loading recipes...</p>}
        renderError={(msg) => <p style={{ color: "crimson" }}>Error: {msg}</p>}
        selectData={(raw) => raw as MealsResponse}
        render={(data) => {
          const meals = data.meals ?? [];
          if (meals.length === 0) return <p>No results.</p>;

          return (
            <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
              {meals.map((m) => (
                <li
                  key={m.idMeal}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                    padding: 12,
                    border: "1px solid #ddd",
                    borderRadius: 10,
                  }}
                >
                  <img
                    src={m.strMealThumb}
                    alt={m.strMeal}
                    width={80}
                    height={80}
                    style={{ borderRadius: 10, objectFit: "cover" }}
                  />
                  <div>
                    <div style={{ fontWeight: 700 }}>{m.strMeal}</div>
                    <div style={{ fontSize: 12, opacity: 0.7 }}>{m.idMeal}</div>
                  </div>
                </li>
              ))}
            </ul>
          );
        }}
      />
    </div>
  );
}
