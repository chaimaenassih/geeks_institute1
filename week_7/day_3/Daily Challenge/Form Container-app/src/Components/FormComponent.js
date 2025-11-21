import React from "react";

function FormComponent(props) {
  const {
    firstName,
    lastName,
    age,
    gender,
    destination,
    nutsFree,
    lactoseFree,
    veganMeal,
  } = props.data;

  return (
    <div className="form-container">
      <form onSubmit={props.handleSubmit}>
        <h2>Sample form</h2>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={props.handleChange}
        />
        <br />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={props.handleChange}
        />
        <br />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={age}
          onChange={props.handleChange}
        />
        <br />

        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={gender === "male"}
            onChange={props.handleChange}
          />
          Male
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={gender === "female"}
            onChange={props.handleChange}
          />
          Female
        </label>
        <br />

        <label>
          Select your destination
          <br />
          <select
            name="destination"
            value={destination}
            onChange={props.handleChange}
          >
            <option value="">-- Please choose a destination --</option>
            <option value="Japan">Japan</option>
            <option value="Brazil">Brazil</option>
            <option value="Canada">Canada</option>
          </select>
        </label>
        <br />
        <br />

        <fieldset>
          <legend>Dietary restrictions:</legend>

          <label>
            <input
              type="checkbox"
              name="nutsFree"
              checked={nutsFree}
              onChange={props.handleChange}
            />
            Nuts free
          </label>
          <br />

          <label>
            <input
              type="checkbox"
              name="lactoseFree"
              checked={lactoseFree}
              onChange={props.handleChange}
            />
            Lactose free
          </label>
          <br />

          <label>
            <input
              type="checkbox"
              name="veganMeal"
              checked={veganMeal}
              onChange={props.handleChange}
            />
            Vegan meal
          </label>
        </fieldset>

        <br />
        <button type="submit">Submit</button>
      </form>

      <div className="entered-info">
        <h2>Entered information:</h2>

        <p>
          <strong>Your name:</strong> {firstName} {lastName}
        </p>
        <p>
          <strong>Your age:</strong> {age}
        </p>
        <p>
          <strong>Your gender:</strong> {gender}
        </p>
        <p>
          <strong>Your destination:</strong> {destination}
        </p>
        <p>
          <strong>Your dietary restrictions:</strong>
        </p>
        <p>**Nuts free : {nutsFree ? "Yes" : "No"}</p>
        <p>**Lactose free : {lactoseFree ? "Yes" : "No"}</p>
        <p>**Vegan meal : {veganMeal ? "Yes" : "No"}</p>
      </div>
    </div>
  );
}

export default FormComponent;
