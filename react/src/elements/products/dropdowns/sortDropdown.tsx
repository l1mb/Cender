import React, { ChangeEvent } from "react";
import styles from "./drop.module.scss";

interface menuProps {
  label: string;
  options: Array<{
    id: number;
    vendorName: string;
  }>;
  value: {
    id: number;
    vendorName: string;
  };
  changeHandler: (e: { id: number; vendorName: string }) => void;
}

function SortDropdown(props: menuProps) {
  const changed = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = props.options.find((val) => val.vendorName === e.currentTarget.value);
    if (value) {
      props.changeHandler(value);
    }
  };

  return (
    <div className={styles.dropdown}>
      <span>{props.label}</span>
      <select onChange={(e) => changed(e)} value={props?.value.label}>
        {props.options.map((u) => (
          <option key={u.id} value={u.id}>
            {u.vendorName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortDropdown;
