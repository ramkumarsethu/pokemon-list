import { Button, Toast, ToastContainer } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useCallback } from "react";
import { setToastMessage } from "../store/slices/ToastSlice";

const ToastMessage = () => {
  const { message } = useAppSelector((state) => state.toastMessage);
  const dispatch = useAppDispatch();

  const handleOnClose = useCallback(() => {
    dispatch(setToastMessage(""));
  }, []);

  return (
    <ToastContainer
      position="bottom-center"
      className="text-white"
      style={{ zIndex: 1, width: "100%", padding: 4 }}
    >
      <Toast
        style={{ width: "inherit" }}
        animation={true}
        show={!!message}
        onClose={handleOnClose}
        bg="danger"
        delay={5000}
        autohide
      >
        <Toast.Body className="d-flex justify-content-between">
          <div>{message}</div>
          <div>
            <Button
              type="button"
              className="btn-close btn-close-white"
              onClick={handleOnClose}
            ></Button>
          </div>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;
