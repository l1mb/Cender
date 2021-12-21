import styles from "./styles.module.scss";

interface categoriesProps {
  label: string;
  setValue: (e: string) => void;
  selected: string;
}

function Categories(props: categoriesProps) {
  return (
    <div className={styles.category} onClick={() => props.setValue(props.label)}>
      <p className={props.label === props.selected ? styles.selected : styles.default}>{props.label}</p>
    </div>
  );
}

export default Categories;
