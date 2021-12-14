import { useSelector, useDispatch } from "react-redux";

import ModalWrap from "./modalWrap/modalWrap";
import ModalAlert from "./modalAlert/modalAlert";
import { RootState } from "../../store";
import { removeMessage } from "../../store/error";

const WithErrorHandler = () => {
  const { message, show, errorCode } = useSelector(
    (state: RootState) => state.error
  );
  const dispatch = useDispatch();
  return (
    <>
      {show ? (
        <ModalWrap type="error">
          <ModalAlert
            type="error"
            content={message}
            result={`Error Code: ${errorCode}`}
            onClick={() => {
              dispatch(removeMessage());
            }}
          />
        </ModalWrap>
      ) : null}
    </>
  );
};

export default WithErrorHandler;
