import { FormEvent, useEffect, useState } from "react";
import InputText from "@/elements/inputElement/inputText";
import defaultInputState from "@/elements/inputElement/state/defaultstate";
import ErrorState from "@/types/interfaces/validation/errorState";
import styles from "./signInForm.module.scss";
import UsernameValidation from "@/types/classes/validation/usernameValidation";

interface inputState {
  value: string;
  error: ErrorState | null;
}

function SignInForm(props): JSX.Element {
  const [usernameProp, setusername] = useState<inputState>(defaultInputState);
  const [passwordProp, setPassword] = useState<inputState>(defaultInputState);
  const [isFormInvalid, setInvalid] = useState(true);

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    const body = {
      username: usernameProp.value,
      password: passwordProp.value,
    };
    props.onSubmit(body);
  };

  useEffect(() => {
    setInvalid(usernameProp.error != null || passwordProp.error != null);
  }, [usernameProp.error, passwordProp.error]);

  return (
    <div className={styles.formWrapper}>
      <h2>Login</h2>
      <form action="submit" className={styles.form} onSubmit={onSubmitForm}>
        <InputText
          setValue={(e) => {
            setusername(e);
          }}
          inputType="text"
          propName="username"
          label="username"
          validation={new UsernameValidation()}
        />
        <InputText
          setValue={(e) => {
            setPassword(e);
          }}
          inputType="text"
          propName="password"
          label="Password"
          validation={new UsernameValidation()}
        />
        <div className={styles.inputItem} />

        <button type="submit" disabled={isFormInvalid}>
          <span />
          <span />
          <span />
          <span />
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
