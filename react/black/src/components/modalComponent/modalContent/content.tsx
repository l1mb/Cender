import React from "react";
import styles from "./content.module.scss";

interface ContentProps {
  children: React.ReactNode;
}

const Content = React.forwardRef<HTMLDivElement, ContentProps>((props, ref) => (
  <div ref={ref} className={styles.container}>
    {props.children}
  </div>
));

export default Content;
