import React, { ChangeEvent } from "react";
import styles from "./radiobuttons.module.scss";

interface cust {
  id: number;
  name: string;
}
interface ButtonProps {
  options: Array<cust>;
  checkedValue: string | undefined;
  changeHandler: (e: cust) => void;
}

function RadioButtons(props: ButtonProps) {
  const changed = (e: ChangeEvent<HTMLInputElement>) => {
    const value = props.options.find((val) => val.name === e.currentTarget.value);
    if (value) {
      props.changeHandler(value);
    }
  };
  return (
    <form className={styles.buttonContainer}>
      {props.options.map((o) => {
        const { name } = o;
        return (
          <div key={name}>
            <input
              type="radio"
              id={name}
              name={name}
              value={name}
              checked={props.checkedValue === name}
              onChange={changed}
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control*/}
            <label htmlFor={name}>{name}</label>
          </div>
        );
      })}
    </form>
  );
}

export default RadioButtons;
