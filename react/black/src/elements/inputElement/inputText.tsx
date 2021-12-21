import EmailValidation from "@/types/classes/validation/emailValidation";
import PhoneValidation from "@/types/classes/validation/noValidation";
import PasswordValidation from "@/types/classes/validation/passwordValidation";
import UsernameValidation from "@/types/classes/validation/usernameValidation";
import ErrorState from "@/types/interfaces/validation/errorState";
import React, { useState } from "react";
import styles from "./inputText.module.scss";

interface prop {
  setValue: (name: { value: string; error: ErrorState | null }) => void;
  inputType: string;
  propName: string;
  label: string;
  validation?: EmailValidation | UsernameValidation | PasswordValidation | PhoneValidation;
  predefinedValue?: string;
}

const InputText: React.FC<prop> = (props): JSX.Element => {
  const [errorState, setError] = useState<ErrorState | null>(null);
  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (props.validation) {
      const validationResult = props.validation.validate(text);
      if (validationResult != null) {
        setError(validationResult as ErrorState);
      } else {
        setError(null);
      }
    }
    props.setValue({ value: text, error: errorState });
  };

  return (
    <div className={styles.inputItem}>
      <input
        onChange={(e) => onchange(e)}
        id={props.propName}
        type={props.inputType}
        required
        defaultValue={props.predefinedValue}
      />
      <label className={styles.caption} htmlFor={props.propName}>
        {props.label}
      </label>
      {errorState && (
        <label className={styles.errorLabel} htmlFor={props.propName}>
          {errorState.errorMessage}
        </label>
      )}
    </div>
  );
};

export default InputText;
