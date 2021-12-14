import classes from "./modalAlert.module.scss";

import EllipseButton from "../../ellipseButton/ellipseButton";

interface Props {
  type: string;
  content: string;
  result: string;
  onClick: Function;
  className?: string;
  style?: object;
}

const ModalAlert = ({
  type,
  content,
  result,
  className,
  style,
  onClick,
}: Props) => (
  <div className={[classes.modalContainer, className].join(" ")} style={style}>
    <img
      className={classes.banner}
      src="/shop/modal_aom_banner.png"
      alt="Alert Modal Banner"
    />

    {(() => {
      switch (type) {
        case "error":
          return (
            <img
              className={classes.alertIcon}
              src="/shop/modal_error.png"
              alt="Alert Modal Icon"
            />
          );
        case "success":
          return (
            <img
              className={classes.alertIcon}
              src="/shop/modal_success.png"
              alt="Alert Modal Icon"
            />
          );
        default:
          return (
            <img
              className={classes.alertIcon}
              src="/shop/modal_error.png"
              alt="Alert Modal Icon"
            />
          );
      }
    })()}

    <p className={classes.content}>{content}</p>
    <p className={classes.result}>{result}</p>

    <EllipseButton title="確定" onClick={onClick}>
      認證
    </EllipseButton>
  </div>
);

export default ModalAlert;
