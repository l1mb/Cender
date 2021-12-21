import signUpUserDto from "@/api/types/user/signUpUserDto";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import signUpDispatch from "@/redux/actions/signUp";
import Modal from "../modalComponent/modalComponent/modal";
import styles from "./auth.module.scss";
import "react-toastify/dist/ReactToastify.css";
import SignUpForm from "../modalComponent/signUpModalComponent/signUpForm";

interface componentProps {
  successRoute: string;
  redirectRoute: string;
}

const SignUp: React.FC<componentProps> = (props) => {
  const [isOpen, setOpen] = useState(true);
  const [registrationStatus, setRegStatus] = useState(0);

  const dispatch = useDispatch();
  const history = useHistory();

  const openModal = (e: boolean) => setOpen(e);
  const setStatus = (e: number) => setRegStatus(e);

  useEffect(() => {
    if (registrationStatus === 201) {
      history.push(props.successRoute);
    }
  }, [registrationStatus]);

  useEffect(() => {
    if (!isOpen) {
      history.push(props.redirectRoute);
    }
  }, [isOpen]);

  const onSubmit = (body: signUpUserDto) => {
    if (body) {
      if (!!body.email && !!body.password && !!body.username) {
        dispatch(signUpDispatch(body, setStatus));
      }
    }
  };

  return (
    <div className={styles.backgroundWrapper}>
      <Modal isOpen={isOpen} setOpen={openModal}>
        <SignUpForm onSubmit={onSubmit} />
      </Modal>
    </div>
  );
};
export default SignUp;
