import styles from "./label.module.css";

interface LabelProps {
  content?: string;
  classname?: string;
  children?: JSX.Element;
}
function Label(props: LabelProps) {
  return (
    <span className={`${styles.label} ${props.classname}`}>
      <div>{props.content}</div>
      {props.children && props.children}
    </span>
  );
}

export default Label;
