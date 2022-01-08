/* eslint-disable jsx-a11y/label-has-associated-control */
import { FormEvent, useEffect, useState } from "react";
import InputText from "@/elements/inputElement/inputText";
import inputState from "@/elements/inputElement/state/InputState";
import defaultInputState from "@/elements/inputElement/state/defaultstate";
import styles from "./signUpForm.module.scss";

function SignUpForm(props): JSX.Element {
  const [emailProp, setEmail] = useState<inputState>(defaultInputState);
  const [passwordProp, setPassword] = useState<inputState>(defaultInputState);
  const [usernameProp, setUsername] = useState<inputState>(defaultInputState);

  const [isInvalid, setInvalid] = useState(true);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newUser = {
      login: emailProp.value,
      password: passwordProp.value,
      name: usernameProp.value,
    };
    props.onSubmit(newUser);
  };

  useEffect(() => {
    setInvalid(emailProp.error != null || passwordProp.error != null);
  }, [emailProp.error, passwordProp.error]);

  return (
    <div className={styles.formWrapper}>
      <h2>Sign up</h2>
      <form onSubmit={onSubmit} className={styles.form}>
        <InputText
          setValue={(e) => {
            setUsername(e);
          }}
          inputType="text"
          propName="username"
          label="Your name"
        />
        <InputText
          setValue={(e) => {
            setEmail(e);
          }}
          inputType="text"
          propName="email"
          label="Login"
        />
        <InputText
          setValue={(e) => {
            setPassword(e);
          }}
          inputType="text"
          propName="password"
          label="Password"
        />

        <button type="submit" disabled={isInvalid}>
          Submit
          <span />
          <span />
          <span />
          <span />
        </button>
      </form>
    </div>
  );
}
export default SignUpForm;
