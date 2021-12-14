import classes from "./ellipseButton.module.scss";

interface Props {
  title: string;
  onClick: Function;
  className?: string;
  style?: object;
}

const ellipseButton: React.FC<Props> = ({
  title,
  onClick,
  className,
  style,
}) => (
  <button
    className={["bg-linear-animate", "btn", classes.btn, className].join(" ")}
    style={style}
    type="button"
    onClick={() => {
      onClick();
    }}
  >
    {title}
  </button>
);

export default ellipseButton;
