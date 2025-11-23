import React from "react";
import quotes from "./QuotesDatabase";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      accentColor: "#f8bbd0" 
    };
  }

  componentDidMount() {
    this.setRandomQuoteAndColor();
  }

  getRandomColor() {
    const palette = [
      "#530505ff", 
      "#f48fb1", 
      "#ce93d8", 
      "#b39ddb", 
      "#022713ff", 
      "#f1ec4eff", 
      "#f06292", 
      "#ba68c8"  
    ];
    const index = Math.floor(Math.random() * palette.length);
    return palette[index];
  }

  getRandomIndex(excludeIndex) {
    if (quotes.length <= 1) return 0;
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === excludeIndex);
    return newIndex;
  }

  setRandomQuoteAndColor = () => {
    const newIndex = this.getRandomIndex(this.state.index);
    const newColor = this.getRandomColor();

    // fond de la page = même couleur
    document.body.style.backgroundColor = newColor;

    this.setState({
      index: newIndex,
      accentColor: newColor
    });
  };

  render() {
    const { index, accentColor } = this.state;
    const { quote, author } = quotes[index] || {};

    return (
      <div className="app">
        <div
          className="quote-box"
          style={{ borderTopColor: accentColor }} // même couleur pour le bord
        >
          <p className="quote-text" style={{ color: accentColor }}>
            “{quote}”
          </p>
          <p className="quote-author" style={{ color: accentColor }}>
            — {author}
          </p>
          <button
            className="quote-button"
            style={{ backgroundColor: accentColor }}
            onClick={this.setRandomQuoteAndColor}
          >
            New quote
          </button>
        </div>
      </div>
    );
  }
}

export default App;
