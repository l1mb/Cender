/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import styles from "./editElement.module.scss";

interface Props {
  label: string;
  setValue: (value: string | number) => void;
  type: string;
  name: string;
  defaultValue?: string | number;
  value: string;
}

function EditInputElement(props: Props) {
  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value;
    props.setValue(text);
  };

  return (
    <div className={styles.inputElement}>
      <label htmlFor={props.label}>{props.label}</label>
      <input
        key={props.label}
        type={props.type}
        name={props.label}
        id={props.label}
        onChange={onchange}
        value={props.value}
      />
    </div>
  );
}

export default EditInputElement;
