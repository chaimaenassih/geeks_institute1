import React from "react";
import { useForm } from "../hooks/useForm";
import type { FormValues } from "../hooks/useForm";

const RegistrationForm: React.FC = () => {
  const {
    values,
    errors,
    isSubmitting,
    submitError,
    submitSuccess,
    handleChange,
    handleSubmit,
  } = useForm({
    initialValues: { email: "", password: "" },
    onSubmit: async (vals: FormValues) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("Submitted values:", vals);
    },
  });

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          className="form-input"
          value={values.email}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="message-error">{errors.email}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          className="form-input"
          value={values.password}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.password && (
          <p className="message-error">{errors.password}</p>
        )}
      </div>

      <div className="btn-row">
        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Register"}
        </button>
      </div>

      {submitError && (
        <p className="message-error">{submitError}</p>
      )}
      {submitSuccess && (
        <p className="message-success">{submitSuccess}</p>
      )}
    </form>
  );
};

export default RegistrationForm;
