import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = "https://api.pexels.com/v1/search";

function Gallery({ query, title, isSearch = false }) {
  const params = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 30;

  const finalQuery = isSearch ? params.searchTerm || "" : query;

  useEffect(() => {
    if (!finalQuery) return;

    const fetchPhotos = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `${API_URL}?query=${encodeURIComponent(finalQuery)}&per_page=${perPage}&page=${page}`,
          {
            headers: {
              Authorization: process.env.REACT_APP_PEXELS_API_KEY || ""
            }
          }
        );

        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }

        const data = await res.json();
        setPhotos(data.photos || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load photos. Check your API key or network.");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [finalQuery, page]);

  // Reset page à 1 quand on change de query (categorie / recherche)
  useEffect(() => {
    setPage(1);
  }, [finalQuery]);

  return (
    <section className="gallery-section">
      <h2 className="gallery-title">
        {isSearch ? `Results for "${finalQuery}"` : title}
      </h2>

      {loading && <p className="status-text">Loading...</p>}
      {error && <p className="status-text error">{error}</p>}
      {!loading && !error && photos.length === 0 && (
        <p className="status-text">No images found.</p>
      )}

      <div className="image-grid">
        {photos.map((photo) => (
          <figure key={photo.id} className="image-item">
            <img
              src={photo.src.medium}
              alt={photo.alt || finalQuery}
              loading="lazy"
            />
          </figure>
        ))}
      </div>

      {/* BONUS : pagination simple */}
      {!loading && photos.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      )}
    </section>
  );
}

export default Gallery;
