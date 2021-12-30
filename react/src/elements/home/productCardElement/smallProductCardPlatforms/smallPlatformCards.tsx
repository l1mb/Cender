import ICategoryData from "@/components/routesComponent/types/categories/ICategoryData";
import styles from "./platforms.module.scss";

const SmallPlatfroms: React.FC<{ imageSource: ICategoryData[] }> = (props) => (
  <div className={styles.platformsWrapper}>
    {props.imageSource.map((u) => (
      <img key={u.name} className={styles.iconImg} src={u.logoImage.image} alt={u.logoImage.imageAlt} />
    ))}
  </div>
);

export default SmallPlatfroms;
