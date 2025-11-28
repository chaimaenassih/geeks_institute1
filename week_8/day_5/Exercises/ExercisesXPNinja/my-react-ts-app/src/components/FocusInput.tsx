import React, { useEffect, useRef } from "react";

const FocusInput: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Focus au montage du composant
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <h2 className="section-title">
        Exercise 5 – Focus Input (useRef)
      </h2>

      <div className="form-group">
        <label htmlFor="focus-input">Auto-focused input:</label>
        <input
          id="focus-input"
          ref={inputRef}
          className="form-input"
          placeholder="Click the button or reload page"
        />
      </div>

      <div className="btn-row">
        <button className="btn" type="button" onClick={handleClick}>
          Focus the input
        </button>
      </div>
    </div>
  );
};

export default FocusInput;
