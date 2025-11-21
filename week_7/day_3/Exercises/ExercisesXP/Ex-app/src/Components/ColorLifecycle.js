import React from "react";

// CHILD COMPONENT (EXERCISE 3)
class Child extends React.Component {
  componentWillUnmount() {
    alert("The component named Header is about to be unmounted.");
  }

  render() {
    return <h1>Hello World!</h1>;
  }
}

// MAIN COMPONENT
class ColorLifecycle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteColor: "red",
      show: true
    };
  }

  // ----------- EXERCISE 2 PART I -----------
  shouldComponentUpdate(nextProps, nextState) {
    console.log("in shouldComponentUpdate");
    return true; // mets false pour tester
  }

  // ----------- EXERCISE 2 PART II -----------
  componentDidMount() {
    setTimeout(() => {
      this.setState({ favoriteColor: "yellow" });
    }, 2000);
  }

  componentDidUpdate() {
    console.log("after update");
  }

  // ----------- EXERCISE 2 PART III -----------
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log(
      "in getSnapshotBeforeUpdate — previous color:",
      prevState.favoriteColor
    );
    return null;
  }

  changeColorToBlue = () => {
    this.setState({ favoriteColor: "blue" });
  };

  // ----------- EXERCISE 3 UNMOUNTING -----------
  deleteHeader = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div style={{ marginTop: "30px" }}>
        <h2>Exercise 2 & 3 : Lifecycle</h2>

        <h3>My Favorite Color is {this.state.favoriteColor}</h3>

        <button onClick={this.changeColorToBlue}>
          Change color to blue
        </button>
       {this.state.show && <Child />}

        <button onClick={this.deleteHeader} style={{ marginTop: "10px" }}>
          Delete Header
        </button>
      </div>
    );
  }
}

export default ColorLifecycle;
