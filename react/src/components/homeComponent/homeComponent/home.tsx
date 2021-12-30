import { useState } from "react";
import SearchBar from "@/elements/home/searchBarElement/searchBar";
import Modal from "@/components/modalComponent/modalComponent/modal";
import EditProduct from "@/components/modalComponent/editProductModal/editProduct";
import modalType from "@/components/modalComponent/editProductModal/modalType";
import Categories from "../categoriesComponent/categories";
import styles from "./home.module.scss";
import Products from "../productComponent/products";

function Home(): JSX.Element {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.searchBar}>
          <SearchBar setOpen={setOpen} show />
        </div>
        <div className={styles.categories}>
          <Categories />
        </div>
        <div className={styles.Products}>
          <Products />
        </div>
      </div>
      <Modal setOpen={(e: boolean) => setOpen(e)} isOpen={isOpen}>
        <EditProduct providedModalType={modalType.CREATE} setOpen={setOpen} />
      </Modal>
    </>
  );
}

export default Home;
