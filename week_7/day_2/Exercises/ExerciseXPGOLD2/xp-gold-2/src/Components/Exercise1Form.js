import React, { useState } from "react";

function Exercise1Form() {
  // on stocke les valeurs des inputs dans un objet
  const [inputs, setInputs] = useState({
    Title: "",
    Author: "",
    Genre: "",
    YearReleased: "",
  });

  const [sent, setSent] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // envoyer les données de formulaire dans le state (inputs déjà dedans)
    // et les afficher dans la console
    console.log("Form data submitted:", inputs);

    // afficher le message "data sent!"
    setSent(true);
  };

  return (
    <div className="card">
      <h2>New Book</h2>

      {sent && <p>data sent!</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title
            <br />
            <input
              type="text"
              name="Title"
              value={inputs.Title}
              onChange={handleChange}
            />
          </label>
        </div>

        <br />

        <div>
          <label>
            Author
            <br />
            <input
              type="text"
              name="Author"
              value={inputs.Author}
              onChange={handleChange}
            />
          </label>
        </div>

        <br />

        <div>
          <label>
            Genre
            <br />
            <input
              type="text"
              name="Genre"
              value={inputs.Genre}
              onChange={handleChange}
            />
          </label>
        </div>

        <br />

        <div>
          <label>
            Year Published
            <br />
            <input
              type="text"
              name="YearReleased"   
              value={inputs.YearReleased}
              onChange={handleChange}
            />
          </label>
        </div>

        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Exercise1Form;
