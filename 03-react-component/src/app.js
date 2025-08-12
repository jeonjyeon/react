import { LogoFunction as Logo } from "./components/logo.js";
import { ShortcutFunction as Shortcut } from "./components/shortcut.js";
import { OutputFunction as Output } from "./components/output.js";

export function App(props) {
  // console.log(props) /* { count, targetCount } */

  // let isAnimate = true;

  // 조건부 렌더링 (Conditional Rendering)
  // 애니메이션이 종료되면 [ 위글 애니메이션도 ] 멈춘다.

  // 문 (값이 없다)
  // if (props.count >= props.targetCount) {
  //   console.log("애니메이션 종료!");
  //   isAnimate = false;
  // }

  // createElement() 함수 내부에서는 문을 사용할 수 없다.
  // 왜? 값이 없으니까! 문 대신, 식을 사용해야 한다.

  // 식 (값이 있다)
  // const isComplete = props.count >= props.targetCount
  // 논리 연산자 식
  // 삼항 연산자 식
  // 옵셔널 체이닝(?.), null 병합 연산자(??)

  // 리스트 렌더링(List Rendering, Render Lists)
  // 배열(데이터)

  // 배열 순환문 (for, while, for...of 등) -> 값이 없음 (함수 몸체 안에서만)
  // let renderElements = []

  // for (let i = 0; i < 3; i++) {
  //   renderElements.push(React.createElement(
  //     Output,
  //     {
  //       key: i,
  //       isAnimate: (props.count < props.targetCount)
  //         ? true
  //         : false
  //     },
  //     props.count + i
  //   ))
  // }

  // 배열의 forEach 메서드 (값이 없음) ❌
  // 배열의 map 메서드 (값이 있음) ✅
  // const renderElements = Array.from({ length: 3 }).map((_, index) =>
  //   React.createElement(
  //     Output,
  //     {
  //       key: index,
  //       isAnimate: props.count < props.targetCount ? true : false,
  //     },
  //     props.count + index
  //   )
  // );

  const app = React.createElement(
    "div",
    { className: "randomCountUpApp" },
    React.createElement(Logo, {}),
    // React.createElement(Output, { isAnimate }, props.count),
    // React.createElement(
    //   Output,
    //   {
    //     isAnimate: props.count < props.targetCount ? true : false,
    //   },
    //   props.count
    // ),
    Array.from({ length: 3 }).map((_, index) =>
      React.createElement(
        Output,
        {
          key: index,
          isAnimate: props.count < props.targetCount ? true : false,
        },
        props.count + index
      )
    ),
    React.createElement(Shortcut, {})
  );
  return app;
}
