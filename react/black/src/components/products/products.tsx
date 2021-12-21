import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Categories from "./categories/categories";
import FilterBar from "./FilterBar/filter";
import ProductCard, { ProductCardProps } from "./productCard/productCard";
import styles from "./style.module.scss";

function Items({ currentItems }) {
  return (
    <div className={styles.cards}>
      {currentItems &&
        currentItems.map((item) => (
          <ProductCard label={item.label} price={item.price} shortDescription={item.shortDescription} />
        ))}
    </div>
  );
}

function PaginatedItems({ itemsPerPage }) {
  // We start with an empty list of items.
  const data: ProductCardProps[] = [
    { label: "Acer aspire", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
    { label: "Acer aspired", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
    { label: "Acer aspider", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
    { label: "Acer aspidero", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
    { label: "Acer aspidore", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
    { label: "Acer aspidor", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
    { label: "Acer spidor", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
    { label: "Acer pidor", shortDescription: "nu zaebis noutbuk, nu ohuenniy", price: "750$" },
  ];

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />

      <ReactPaginate
        className={styles.pag_buttons}
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
function Products() {
  const catData = ["all", "dlya bichey", "chisto multiki", "poigrat'"];
  const [categorie, setCategorie] = useState(catData[0].toUpperCase());

  useEffect(() => {
    // TODO: fetch data
  }, [categorie]);
  return (
    <div className={styles.extraDiv}>
      <div className={styles.page_wrapper}>
        <div className={styles.content}>
          <h3 className={styles.header}>Прокат ноутбуков в Минске</h3>
          <div className={styles.categories}>
            {catData.map((elem) => (
              <Categories label={elem.toUpperCase()} setValue={(e: string) => setCategorie(e)} selected={categorie} />
            ))}
          </div>

          <div className={styles.contentRow}>
            <div>
              <FilterBar setQuery={(e: string) => {}} categorie={categorie} />
            </div>

            <div className={styles.pagination}>
              <PaginatedItems itemsPerPage={2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
