import { LogoFunction as Logo } from "./components/logo.js";
import { ShortcutFunction as Shortcut } from "./components/shortcut.js";
import { OutputFunction as Output } from "./components/output.js";

export function App(props) {
  // console.log(props) /* { count, targetCount } */

  let isAnimate = true;

  // 조건부 렌더링 (Conditional Rendering)
  // 애니메이션이 종료되면 [ 위글 애니메이션도 ] 멈춘다.
  if (props.count >= props.targetCount) {
    console.log("애니메이션 종료!");
    isAnimate = false;
  }

  const app = React.createElement(
    "div",
    { className: "randomCountUpApp" },
    React.createElement(Logo, {}),
    React.createElement(Output, { isAnimate }, props.count),
    React.createElement(Shortcut, {})
  );
  return app;
}
