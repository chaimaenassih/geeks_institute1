import React from "react";
import { useDataFetching } from "../hooks/useDataFetching";

interface User {
  id: number;
  name: string;
  email: string;
}

const CachedUserList: React.FC = () => {
  const {
    data,
    loading,
    error,
    refetch,
    invalidateCache,
  } = useDataFetching<User[]>(
    "https://jsonplaceholder.typicode.com/users",
    { maxAge: 5 * 60 * 1000 } // 5 minutes
  );

  const handleRefresh = () => {
    refetch();
  };

  const handleClearAndRefresh = () => {
    invalidateCache();
    refetch();
  };

  if (loading && !data) {
    return <p className="status-muted">Loading users...</p>;
  }

  if (error && !data) {
    return (
      <div>
        <p className="status-error">Error: {error}</p>
        <button className="btn" onClick={handleRefresh}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="section-title">Cached User List</h2>

      <p className="helper-text">
        Data is cached for 5 minutes. You can refresh or clear the cache.
      </p>

      <div className="btn-row">
        <button className="btn btn-secondary" onClick={handleRefresh}>
          Refresh (use cache)
        </button>
        <button className="btn" onClick={handleClearAndRefresh}>
          Clear Cache &amp; Refresh
        </button>
      </div>

      {loading && <p className="status-muted">Refreshing...</p>}
      {error && (
        <p className="status-error">Error: {error}</p>
      )}

      <ul className="selected-users-list">
        {data?.map((user) => (
          <li key={user.id}>
            {user.name} — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CachedUserList;
