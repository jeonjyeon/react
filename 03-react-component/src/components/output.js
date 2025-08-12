export function OutputFunction(props) {
  return React.createElement("output", { className: "output" }, props.children);
}

export class OutputClass extends React.Component {
  render() {
    return React.createElement(
      "output",
      { className: "output" },
      this.props.children
    );
  }
}
