import { ChangeEvent } from "react";
import styles from "./editdropdown.module.scss";

interface menuProps {
  label: string;
  value: string;
  options: Array<string>;
  changeHandler: (e: string) => void;
}
const EditDropdown: React.FC<menuProps> = (props) => {
  const changed = (e: ChangeEvent<HTMLSelectElement>) => {
    props.changeHandler(e.currentTarget.value);
  };
  let key = 0;

  return (
    <div className={styles.dropdown}>
      <span>{props.label}</span>
      <select onChange={(e) => changed(e)} value={props?.value}>
        {props.options.map((u) => {
          const value = u;
          key += 1;
          return (
            <option key={value + key} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default EditDropdown;
