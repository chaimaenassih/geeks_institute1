import React, { useState } from "react";
import Input from "./Input";

function Form() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

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
      newErrors.phone = "Phone number is invalid";
    } else if (!/^\d{6,15}$/.test(values.phone.trim())) {
      newErrors.phone = "Phone number is invalid";
    }

    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    console.log("Valid form submitted:", values);
    alert("Form is valid!");
  };

  return (
    <div className="form-card">
      <form onSubmit={handleSubmit}>
        <Input
          label="First Name"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />

        <Input
          label="Last Name"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />

        <Input
          label="Phone"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        <Input
          label="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
