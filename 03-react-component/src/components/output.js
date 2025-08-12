export function OutputFunction(props) {
  let classNames = "output";

  if (props.isAnimate) {
    /* 컴포넌트 속성: 상태를 제어하는 클래스 이름 */
    // console.log(props.isAnimate)
    classNames += " is-animate";
  }

  return React.createElement(
    "output",
    { className: classNames },
    props.children
  );
}

// JavaScript 방식 (명령형 프로그래밍)
// document.querySelector('.output').addEventListener('animationend', (e) => [
//   e.currentTarget.classList.remove('is-animate')
// ])

export class OutputClass extends React.Component {
  render() {
    return React.createElement(
      "output",
      { className: "output" },
      this.props.children
    );
  }
}
