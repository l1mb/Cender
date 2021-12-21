import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import signInUserDto from "@/api/types/user/signInUserDto";
import userDto from "@/api/types/user/userDto";
import signInDispatch from "@/redux/actions/signIn";
import StateType from "@/redux/types/stateType";
import Modal from "../modalComponent/modalComponent/modal";
import SignInForm from "../modalComponent/signInModalComponent/signInForm";
import styles from "./auth.module.scss";

interface componentProps {
  successRoute: string;
  redirectRoute: string;
}

type From = {
  from: {
    pathname: string;
  };
};

function SignIn(props: componentProps) {
  const [isOpen, setOpen] = useState(true);

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation<From>();

  const user = useSelector<StateType, userDto>((state) => state.user);

  const { from } = location.state || {
    from: { pathname: props.successRoute },
  };

  useEffect(() => {
    if (user.authencated) {
      history.push(from.pathname);
    }
  }, [user.authencated]);

  const openModal = (e: boolean) => setOpen(e);

  const isSignInOk = (body: signInUserDto) => {
    if (body.username && body.password) {
      dispatch(signInDispatch(body));
    }
  };

  const onSubmit = (e: signInUserDto) => {
    isSignInOk(e);
  };

  useEffect(() => {
    if (!isOpen) {
      history.push(props.redirectRoute);
    }
  }, [isOpen]);

  return (
    <div className={styles.backgroundWrapper}>
      <Modal isOpen={isOpen} setOpen={openModal}>
        <SignInForm onSubmit={onSubmit} />
      </Modal>
    </div>
  );
}

export default SignIn;
