import React from "react";
import styles from "./button.module.scss";

interface ButtonProps {
  label: string;
  action?: () => void;
  disabled?: boolean;
}

const ProfileButton: React.FC<ButtonProps> = (props) => (
  <button onClick={props.action} type="submit" disabled={props.disabled} className={styles.button}>
    {props.label}
  </button>
);

export default ProfileButton;
