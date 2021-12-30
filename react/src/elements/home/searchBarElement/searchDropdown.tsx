// eslint-disable-next-line no-use-before-define
import React from "react";

import styles from "./searchBar.module.scss";

const Dropdown: React.FC<{ names: string[] }> = (props) => (
  <ul className={styles.dropdown}>
    {props.names?.map((v) => (
      <React.Fragment key={v}>
        <li>{v}</li>
        <hr />
      </React.Fragment>
    ))}
  </ul>
);

export default Dropdown;
