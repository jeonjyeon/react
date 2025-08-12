import { LogoFunction as Logo } from "./components/logo.js";
import { ShortcutFunction as Shortcut } from "./components/shortcut.js";
import { OutputFunction as Output } from "./components/output.js";

export function App(props) {
  const app = React.createElement(
    "div",
    { className: "randomCountUpApp" },
    React.createElement(Logo, {}),
    React.createElement(Output, {}, props.count),
    React.createElement(Shortcut, {})
  );
  return app;
}
