import "react";

function Input({
  label,
  type = "text",
  value,
  onChange,
  id,
  required = false,
  placeholder = "",
}) {
  return (
    <div>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="input"
      />
    </div>
  );
}

export default Input;
