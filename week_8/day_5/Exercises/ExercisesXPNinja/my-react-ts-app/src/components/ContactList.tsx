import React, { useState } from "react";
import { useContacts } from "../context/ContactContext";
import type { Contact } from "../context/ContactContext";

const ContactList: React.FC = () => {
  const { state, dispatch } = useContacts();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleAdd = () => {
    if (!name.trim() || !email.trim()) return;
    const newContact: Contact = {
      id: Date.now(),
      name,
      email,
    };
    dispatch({ type: "addContact", payload: newContact });
    setName("");
    setEmail("");
  };

  const handleRemove = (id: number) => {
    dispatch({ type: "removeContact", payload: { id } });
  };

  return (
    <div>
      <h2 className="section-title">
        Exercise 4 – Contact List (useContext + useReducer)
      </h2>

      <div className="form">
        <div className="form-group">
          <label htmlFor="contact-add-name">Name:</label>
          <input
            id="contact-add-name"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contact name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-add-email">Email:</label>
          <input
            id="contact-add-email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Contact email"
          />
        </div>

        <div className="btn-row">
          <button className="btn" type="button" onClick={handleAdd}>
            Add Contact
          </button>
        </div>
      </div>

      {state.contacts.length === 0 ? (
        <p className="status-muted">No contacts yet.</p>
      ) : (
        <ul className="selected-users-list">
          {state.contacts.map((c) => (
            <li key={c.id}>
              {c.name} — {c.email}{" "}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handleRemove(c.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
