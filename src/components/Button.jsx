import "react";

function Button({ text, onClick, className, type = "button" }) {
  return (
    <button className={`btn ${className}`} onClick={onClick} type={type}>
      {text}
    </button>
  );
}

export default Button;
