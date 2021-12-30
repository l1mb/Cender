import Label from "@/elements/home/labelElement/label";
import PlatformCard from "@/elements/home/platformCardElement/platformCard";
import CategoriesData from "../../routesComponent/types/categories/categoriesData";

import styles from "./categories.module.scss";

const cards = CategoriesData.map((elem) => <PlatformCard key={elem.name} data={elem} />);

function Categories(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <Label content="Shapes" />
      <div>{cards}</div>
    </div>
  );
}
export default Categories;
