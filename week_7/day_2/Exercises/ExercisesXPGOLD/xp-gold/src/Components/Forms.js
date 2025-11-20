import React, { useState } from "react";

function Forms() {
  // Part I & IV : username + age
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(null);

  // Part V : message d’erreur sur l’âge
  const [errorMessage, setErrorMessage] = useState("");

  // Part VI : textarea
  const [textareaValue, setTextareaValue] = useState(
    "This is some default text in the textarea."
  );

  // Part VII : select (car brands)
  const [myCar, setMyCar] = useState("Volvo");

  // Part I, II, IV, V : gérer les inputs name + age
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "username") {
      setUsername(value);
    }

    if (name === "age") {
      // Validation : si ce n’est pas un nombre => erreur
      if (value && !Number(value)) {
        setErrorMessage("Your age must be a number");
      } else {
        setErrorMessage("");
      }
      setAge(value);
    }
  };

  // Part III : submit
  const mySubmitHandler = (event) => {
    event.preventDefault();
    alert("You are submitting: " + username);
  };

  // Part VI : textarea
  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  // Part VII : select
  const handleCarChange = (event) => {
    setMyCar(event.target.value);
  };

  // Part II : rendu conditionnel du header
  let header = null;
  if (username || age) {
    header = (
      <h2>
        {username && `Hello, ${username}`} {age && `(Age: ${age})`}
      </h2>
    );
  }

  return (
    <div>
      {/* Part II : header conditionnel */}
      {header}

      {/* Part I à V : Formulaire name + age */}
      <form onSubmit={mySubmitHandler}>
        <div>
          <label>
            Enter your name:
            <br />
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </label>
        </div>

        <br />

        <div>
          <label>
            Enter your age:
            <br />
            <input
              type="text"
              name="age"
              value={age ?? ""}
              onChange={handleChange}
            />
          </label>
          {/* Part V : message d’erreur */}
          {errorMessage && (
            <p style={{ color: "red" }}>{errorMessage}</p>
          )}
        </div>

        <br />

        <button type="submit">Submit</button>
      </form>

      <br />
      <hr />
      <br />

      {/* Part VI : Textarea */}
      <div>
        <h3>Textarea example</h3>
        <textarea
          value={textareaValue}
          onChange={handleTextareaChange}
          rows={4}
          cols={40}
        />
      </div>

      <br />
      <hr />
      <br />

      {/* Part VII : Select */}
      <div>
        <h3>Select a car</h3>
        <select value={myCar} onChange={handleCarChange}>
          <option value="Volvo">Volvo</option>
          <option value="Saab">Saab</option>
          <option value="Mercedes">Mercedes</option>
          <option value="Audi">Audi</option>
        </select>
        <p>My selected car is: {myCar}</p>
      </div>
    </div>
  );
}

export default Forms;
