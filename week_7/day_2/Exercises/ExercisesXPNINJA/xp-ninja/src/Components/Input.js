import React from "react";

function Input({ label, name, type = "text", value, onChange, error }) {
  return (
    <div className="input-group">
      <label>
        {label}
        <br />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        />
      </label>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default Input;
