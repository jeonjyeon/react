export default function Output(props) {
  const classNames = `output ${props.isAnimate ? "is-animate" : ""}`.trim();

  return React.createElement(
    "output",
    { className: classNames },
    props.children
  );
}

// function Jsx(props) {
//   return (
//     <output className={`output ${props.isAnimate ? "is-animate" : ""}`.trim()}>
//       {props.children}
//     </output>
//   );
// }
