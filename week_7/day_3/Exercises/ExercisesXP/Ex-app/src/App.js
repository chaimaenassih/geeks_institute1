import React from "react";
import ErrorBoundary from "./Components/ErrorBoundary";
import ColorLifecycle from "./Components/ColorLifecycle";
import "./App.css";

// ---------------- BUGGY COUNTER (EXERCISE 1) ------------------
class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }

  handleClick = () => {
    this.setState((prev) => ({
      counter: prev.counter + 1
    }));
  };

  render() {
    if (this.state.counter === 5) {
      throw new Error("I crashed!");
    }

    return (
      <button
        onClick={this.handleClick}
        style={{ margin: "5px", padding: "8px" }}
      >
        {this.state.counter}
      </button>
    );
  }
}

// ---------------- MAIN APP ------------------
function App() {
  return (
    <div className="App">
      <h2>Exercise 1 : React Error Boundary Simulation</h2>

      <p>
        Click on the numbers to increase the counters.
        The counter is programmed to throw error when it reaches 5.
        This simulates a JavaScript error in a component.
      </p>

      {/* Simulation 1 */}
      <ErrorBoundary>
        <h4>
          These two counters are wrapped in the same error boundary. 
          If one crashes, both will be replaced by the error message.
        </h4>
        <BuggyCounter />
        <BuggyCounter />
      </ErrorBoundary>

      <hr />

      {/* Simulation 2 */}
      <h4>
        These two counters are each inside of their own error boundary.
        So if one crashes, the other is not affected.
      </h4>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>

      <hr />

      {/* Simulation 3 */}
      <h4>
        This counter is not inside of boundary. 
        So if it crashes, all other components are deleted.
      </h4>
      <BuggyCounter />

      <hr />

      <ColorLifecycle />
    </div>
  );
}


export default App;
