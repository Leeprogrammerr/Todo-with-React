import classes from "./Button.module.css";
const Button = ({ name, className, type, onClick }) => {
  return (
    <button
      className={`${classes.button} ${className || ""}`}
      type={type || "button"}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
