import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageFromServer: "", 
      post: "",              
      responseFromServer: "" 
    };
  }

  // PARTIE I : récupérer "Hello From Express"
  async componentDidMount() {
    try {
      const res = await fetch("http://localhost:5000/api/hello");
      const text = await res.text();
      this.setState({ messageFromServer: text });
    } catch (error) {
      console.error("Error fetching /api/hello:", error);
    }
  }

  handleChange = (event) => {
    this.setState({ post: event.target.value });
  };

  // PARTIE II : envoyer la valeur de l'input au serveur
  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/world", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ post: this.state.post })
      });

      const text = await res.text();
      this.setState({ responseFromServer: text });
    } catch (error) {
      console.error("Error posting to /api/world:", error);
    }
  };

  render() {
    return (
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
          marginTop: "40px"
        }}
      >
        {/* PARTIE I : message du GET */}
        <h1>{this.state.messageFromServer}</h1>

        {/* PARTIE II : formulaire */}
        <h2>Post to Server:</h2>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.post}
            onChange={this.handleChange}
            placeholder="Hi from client"
            style={{ padding: "5px", minWidth: "250px" }}
          />
          <button type="submit" style={{ marginLeft: "10px", padding: "5px 15px" }}>
            Submit
          </button>
        </form>

        {/* Message renvoyé par le serveur */}
        {this.state.responseFromServer && (
          <p style={{ marginTop: "20px" }}>
            {this.state.responseFromServer}
          </p>
        )}
      </div>
    );
  }
}

export default App;
