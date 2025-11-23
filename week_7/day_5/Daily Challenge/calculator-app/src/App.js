import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number1: "",
      number2: "",
      operation: "add", // add | sub | mul | div
      result: null
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleOperationChange = (event) => {
    this.setState({ operation: event.target.value });
  };

  handleCalculate = (event) => {
    event.preventDefault();

    const { number1, number2, operation } = this.state;

    const a = parseFloat(number1);
    const b = parseFloat(number2);

    if (isNaN(a) || isNaN(b)) {
      this.setState({ result: "Please enter valid numbers." });
      return;
    }

    let res;
    switch (operation) {
      case "add":
        res = a + b;
        break;
      case "sub":
        res = a - b;
        break;
      case "mul":
        res = a * b;
        break;
      case "div":
        if (b === 0) {
          res = "Cannot divide by zero.";
        } else {
          res = a / b;
        }
        break;
      default:
        res = "";
    }

    this.setState({ result: res });
  };

  render() {
    const { number1, number2, operation, result } = this.state;

    return (
      <div className="calc-root">
        <div className="calc-card">
          <h1>Adding Two Numbers</h1>

          <form onSubmit={this.handleCalculate}>
            <div className="inputs-row">
              <input
                type="number"
                name="number1"
                value={number1}
                onChange={this.handleChange}
                placeholder="First number"
                className="calc-input"
              />
              <input
                type="number"
                name="number2"
                value={number2}
                onChange={this.handleChange}
                placeholder="Second number"
                className="calc-input"
              />
            </div>

            {/* BONUS : choix d’opération, tu peux l’enlever si ton prof veut exactement l’exemple */}
            <div className="operation-row">
              <label>
                Operation:&nbsp;
                <select
                  value={operation}
                  onChange={this.handleOperationChange}
                >
                  <option value="add">Addition (+)</option>
                  <option value="sub">Subtraction (-)</option>
                  <option value="mul">Multiplication (×)</option>
                  <option value="div">Division (÷)</option>
                </select>
              </label>
            </div>

            <button type="submit" className="calc-button">
              Add Them!
            </button>
          </form>

          <div className="result-display">
            {result !== null && !isNaN(result) && typeof result === "number" ? (
              <span>{result}</span>
            ) : (
              <span className="result-hint">
                {result === null ? "Enter numbers and click the button" : result}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
