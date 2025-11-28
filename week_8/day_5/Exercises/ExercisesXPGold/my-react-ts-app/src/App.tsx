import React, { useState } from "react";
import RegistrationForm from "./components/RegistrationForm";
import DataTable from "./components/DataTable";
import type { TableColumn } from "./components/DataTable";
import CachedUserList from "./components/CachedUserList";

type UserRow = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const sampleUsers: UserRow[] = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "User" },
  {
    id: 3,
    name: "Charlie",
    email: "charlie@example.com",
    role: "Manager",
  },
];

const userColumns: TableColumn<UserRow>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  { key: "role", header: "Role", sortable: true },
];

const App: React.FC = () => {
  const [selectedUsers, setSelectedUsers] = useState<UserRow[]>([]);

  return (
    <div className="app">
   
      <section className="section">
        <h2 className="section-title">Registration Form</h2>
        <RegistrationForm />
      </section>

      <section className="section">
        <h2 className="section-title">User Table</h2>
        <div className="table-wrapper">
          <DataTable<UserRow>
            data={sampleUsers}
            columns={userColumns}
            onSelect={setSelectedUsers}
          />
        </div>

        <h3 className="subsection-title">Selected Users</h3>
        {selectedUsers.length === 0 ? (
          <p className="status-muted">No users selected.</p>
        ) : (
          <ul className="selected-users-list">
            {selectedUsers.map((u) => (
              <li key={u.id}>{u.name}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="section">
        <CachedUserList />
      </section>
    </div>
  );
};

export default App;
