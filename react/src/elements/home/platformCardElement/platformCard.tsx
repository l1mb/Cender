import { useHistory } from "react-router-dom";
import ICategoryData from "@/components/routesComponent/types/categories/ICategoryData";
import styles from "./platformCard.module.scss";

interface PlatformProps {
  data: ICategoryData;
}

function PlatformCard(props: PlatfromProps) {
  const history = useHistory();
  const push = () => {
    history.push(`/products/${props.data.name.toLowerCase()}`);
  };

  const clickHandler = () => {
    push();
  };

  const keyHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      push();
    }
  };

  return (
    <div
      onClick={clickHandler}
      onKeyDown={(e) => keyHandler(e)}
      role="button"
      tabIndex={0}
      className={styles.cardWrapper}
    >
      <img src={props.data.logoImage.image} alt={props.data.logoImage.imageAlt} />
      <span>{props.data.name}</span>
    </div>
  );
}

export default PlatformCard;
