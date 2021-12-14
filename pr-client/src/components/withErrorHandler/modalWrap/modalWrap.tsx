import classes from "./modalWrap.module.scss";

interface Props {
  type?: string;
  className?: string;
  style?: object;
}

const modalWrap: React.FC<Props> = ({ children, type, className, style }) => (
  <>
    {(() => {
      switch (type) {
        case "error":
          return (
            <div
              className={[classes.modalWrap, className].join(" ")}
              style={{
                boxShadow: "0 7px 18px 9px rgba(255, 108, 108, 0.25)",
                ...style,
              }}
            >
              {children}
            </div>
          );
        default:
          return (
            <div
              className={[classes.modalWrap, className].join(" ")}
              style={style}
            >
              {children}
            </div>
          );
      }
    })()}
  </>
);

export default modalWrap;
