import Label from "@/elements/home/labelElement/label";
import InputText from "@/elements/inputElement/inputText";
import defaultInputState from "@/elements/inputElement/state/defaultstate";
import PasswordValidation from "@/types/classes/validation/passwordValidation";
import ErrorState from "@/types/interfaces/validation/errorState";
import { FormEvent, useEffect, useState } from "react";
import styles from "./password.module.scss";

interface inputState {
  value: string;
  error: ErrorState | null;
}

const PasswordModal: React.FC<{
  onSubmit: (e: string) => void;
}> = (props): JSX.Element => {
  const [passwordProp, setPassword] = useState<inputState>(defaultInputState);
  const [confirmPasswordProp, setConfirmPassword] = useState<inputState>(defaultInputState);

  const [isFormInvalid, setInvalid] = useState(true);

  const [notSame, setNotSame] = useState(false);

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    const password = passwordProp.value;
    if (password !== "") {
      props.onSubmit(password);
    }
  };

  useEffect(() => {
    setInvalid(confirmPasswordProp.error != null || passwordProp.error != null);
    setNotSame(confirmPasswordProp.value !== passwordProp.value);
  }, [confirmPasswordProp.value && passwordProp.value]);

  return (
    <div className={styles.formWrapper}>
      <form action="submit" className={styles.form} onSubmit={onSubmitForm}>
        <Label content="Change password" classname={styles.label} />
        <InputText
          setValue={(e) => {
            setPassword(e);
          }}
          inputType="password"
          propName="firstPassword"
          label="Password"
          validation={new PasswordValidation()}
        />
        <InputText
          setValue={(e) => {
            setConfirmPassword(e);
          }}
          inputType="password"
          propName="secondPassword"
          label="Confirm your password"
          validation={new PasswordValidation()}
        />
        {notSame && (
          <div className={`${styles.inputItem} ${styles.error}`}>
            <span>Passwords needs to be same</span>
          </div>
        )}
        <button type="submit" disabled={isFormInvalid || notSame}>
          <span />
          <span />
          <span />
          <span />
          Submit
        </button>
      </form>
    </div>
  );
};

export default PasswordModal;
