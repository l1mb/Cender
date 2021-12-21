import QueryItem from "@/api/types/Products/queryParams";
import React, { ChangeEvent } from "react";

import styles from "./drop.module.scss";

interface menuProps {
  label: string;
  value: QueryItem | undefined;
  options: Array<QueryItem>;
  changeHandler: (e: QueryItem) => void;
}

const SortDropdown: React.FC<menuProps> = (props) => {
  const changed = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = props.options.find((val) => val.label === e.currentTarget.value);
    if (value) {
      props.changeHandler(value);
    }
  };

  return (
    <div className={styles.dropdown}>
      <span>{props.label}</span>
      <select onChange={(e) => changed(e)} value={props?.value?.label}>
        {props.options.map((u) => {
          const value = u.label;
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SortDropdown;
