import styles from "./label.module.css";

interface LabelProps {
  content?: string;
  classname?: string;
}
const Label: React.FC<LabelProps> = (props) => (
  <span className={`${styles.label} ${props.classname}`}>{props.content}</span>
);

export default Label;
