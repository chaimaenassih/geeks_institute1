import React from "react";
import "./App.css"; 
import FormComponent from "./Components/FormComponent"; 

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      destination: "",
      nutsFree: false,
      lactoseFree: false,
      veganMeal: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const queryString = new URLSearchParams(formData).toString();
    const newUrl = `${window.location.pathname}?${queryString}`;
    window.history.replaceState(null, "", newUrl);
  }

  render() {
    return (
      <div>
        <FormComponent
          data={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default App;
