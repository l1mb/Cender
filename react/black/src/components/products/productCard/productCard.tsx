import styles from "./styles.module.scss";
import defaultIMg from "../../../assets/images/profile/default-profile.jpg";

export interface ProductCardProps {
  label: string;
  shortDescription: string;
  price: string;
  img?: string;
}

function ProductCard(props: ProductCardProps) {
  return (
    <div className={styles.card_container}>
      <div className={styles.card_top_row}>
        <img src={props.img ? props.img : defaultIMg} alt="yan" />
        <div className={styles.descript}>
          <span>{props.label}</span>
          <p>{props.price}</p>
        </div>
      </div>
      <div>
        <p>{props.shortDescription}</p>
      </div>
    </div>
  );
}

export default ProductCard;
