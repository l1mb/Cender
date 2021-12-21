/* eslint-disable jsx-a11y/label-has-associated-control */
import { FormEvent, useEffect, useState } from "react";
import InputText from "@/elements/inputElement/inputText";
import EmailValidation from "@/types/classes/validation/emailValidation";
import AuthFormProps from "@/types/interfaces/props/formProps/authFormProps";
import inputState from "@/elements/inputElement/state/InputState";
import defaultInputState from "@/elements/inputElement/state/defaultstate";
import PhoneValidation from "@/types/classes/validation/noValidation";
import PasswordValidation from "@/types/classes/validation/passwordValidation";
import UsernameValidation from "@/types/classes/validation/usernameValidation";
import styles from "./signUpForm.module.scss";

const SignUpForm: React.FC<AuthFormProps> = (props): JSX.Element => {
  const [emailProp, setEmail] = useState<inputState>(defaultInputState);
  const [passwordProp, setPassword] = useState<inputState>(defaultInputState);
  const [phoneProp, setPhone] = useState<inputState>(defaultInputState);
  const [usernameProp, setUsername] = useState<inputState>(defaultInputState);

  const [isInvalid, setInvalid] = useState(true);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newUser = {
      email: emailProp.value,
      password: passwordProp.value,
      phone: phoneProp.value,
      username: usernameProp.value,
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
          label="UserName"
        />
        <InputText
          setValue={(e) => {
            setPhone(e);
          }}
          inputType="text"
          propName="phone"
          label="Phone number"
        />
        <InputText
          setValue={(e) => {
            setEmail(e);
          }}
          inputType="text"
          propName="email"
          label="Email"
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
};
export default SignUpForm;
