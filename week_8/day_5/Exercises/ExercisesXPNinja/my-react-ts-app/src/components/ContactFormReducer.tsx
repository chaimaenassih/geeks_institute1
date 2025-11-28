import React, { useReducer } from "react";

interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

type ContactFormAction =
  | {
      type: "updateField";
      field: keyof ContactFormState;
      value: string;
    }
  | { type: "resetForm" };

const initialContactFormState: ContactFormState = {
  name: "",
  email: "",
  message: "",
};

function contactFormReducer(
  state: ContactFormState,
  action: ContactFormAction
): ContactFormState {
  switch (action.type) {
    case "updateField":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "resetForm":
      return initialContactFormState;
    default:
      return state;
  }
}

const ContactFormReducer: React.FC = () => {
  const [state, dispatch] = useReducer(
    contactFormReducer,
    initialContactFormState
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch({
      type: "updateField",
      field: name as keyof ContactFormState,
      value,
    });
  };

  const handleReset = () => {
    dispatch({ type: "resetForm" });
  };

  return (
    <div>
      <h2 className="section-title">
        Exercise 3 – Contact Form (useReducer)
      </h2>

      <form className="form">
        <div className="form-group">
          <label htmlFor="contact-name">Name:</label>
          <input
            id="contact-name"
            name="name"
            className="form-input"
            value={state.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-email">Email:</label>
          <input
            id="contact-email"
            name="email"
            className="form-input"
            value={state.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-message">Message:</label>
          <textarea
            id="contact-message"
            name="message"
            className="form-input"
            rows={3}
            value={state.message}
            onChange={handleChange}
          />
        </div>

        <div className="btn-row">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
          >
            Reset Form
          </button>
        </div>
      </form>

      <p className="status-text">
        Current state: {JSON.stringify(state)}
      </p>
    </div>
  );
};

export default ContactFormReducer;
