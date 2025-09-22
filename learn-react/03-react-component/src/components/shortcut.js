export default function ShortcutFunction() {
  const data = {
    className: "shortcut-info",
    shortcutKey: "Shift + Enter",
    message: " 키를 누르면 애니메이션이 다시 시작됩니다.",
  };

  // 리액트 엘리먼트 생성 과정에서 props로 데이터 바인딩(data binding)
  return React.createElement(
    "p",
    { className: data.className },
    React.createElement("code", {}, data.shortcutKey),
    data.message
  );
}

export class ShortcutClass extends React.Component {
  constructor(props) {
    super(props);
    // 컴포넌트 상태 정의
    this.state = {
      className: "shortcut-info",
      shortcutKey: "Shift + Enter",
      message: " 키를 누르면 애니메이션이 다시 시작됩니다.",
    };
  }

  render() {
    // 상태(데이터 객체) 구조 분해 할당
    const { className, shortcutKey, message } = this.state;

    return React.createElement(
      "p",
      { className: className },
      React.createElement("code", {}, shortcutKey),
      message
    );
  }
}
