import React, { useState } from "react";

function Exercise2UserForm() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!values.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!values.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!values.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{6,15}$/.test(values.phone.trim())) {
      newErrors.phone = "Phone must be 6–15 digits";
    }

    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      newErrors.email = "Email is not valid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmittedData(values);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setValues({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    });
    setErrors({});
    setSubmittedData(null);
    setIsSubmitted(false);
  };

  // Après submit : on affiche la "carte" résultat + bouton Reset
  if (isSubmitted && submittedData) {
    return (
      <div className="card">
        <p style={{ fontWeight: "bold", marginBottom: "30px" }}>
          {submittedData.lastName}, {submittedData.firstName}
        </p>
        <p style={{ marginBottom: "30px" }}>
          {submittedData.phone} | {submittedData.email}
        </p>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    );
  }

  // Sinon : on affiche le formulaire "Welcome!"
  return (
    <div className="card">
      <h2>Welcome!</h2>
      <p>Please provide your information below.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={values.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <p style={{ color: "red" }}>{errors.firstName}</p>
          )}
        </div>

        <br />

        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={values.lastName}
            onChange={handleChange}
          />
          {errors.lastName && (
            <p style={{ color: "red" }}>{errors.lastName}</p>
          )}
        </div>

        <br />

        <div>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={values.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <p style={{ color: "red" }}>{errors.phone}</p>
          )}
        </div>

        <br />

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email}</p>
          )}
        </div>

        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Exercise2UserForm;
