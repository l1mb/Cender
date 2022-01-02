import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Stack } from "@mui/material";
import useProductFetcher from "@/hooks/loader/loader";
import FilterBar from "./FilterBar/filter";
import styles from "./style.module.scss";
import productsApi from "@/api/httpService/products/productsApi";
import StateType from "@/redux/types/stateType";
import SearchBar from "@/elements/home/searchBarElement/searchBar";
import { readProductDto } from "@/api/types/newProduct/rProductDto";
import FilteredProducts from "./ProductBar/FilteredProducts";
import Label from "@/elements/home/labelElement/label";

const mockData: readProductDto[] = [];

interface itemsProps {
  setMode: (e: string) => void;
  setProduct: (e: readProductDto) => void;
  currentItems: readProductDto[] | null;
  pageNumber: number;
}

interface paginatedProps {
  data: readProductDto[];
}

function PaginatedItems(props: paginatedProps) {
  const [data, setData] = useState<readProductDto[]>(mockData);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return <FilteredProducts key={data} products={data} />;
}
function Products() {
  const { setParams, params } = useProductFetcher();
  const [mode, setMode] = useState("create");
  const [product, setProduct] = useState<readProductDto>();
  const [pagesCount, setPagesCount] = useState<number>(1);
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);

  const data = useSelector<StateType, readProductDto[]>((state) => state.products);

  useEffect(() => {
    async function getCount() {
      const res = await (await productsApi.apiGetCount()).json();
      if (res) {
        setPagesCount(res + 1);
      }
    }

    getCount();
  }, []);

  const handlePageClick = (event, page) => {
    const t = params;
    if (t) {
      t.page = page;
      setParams({ ...t });
    }
  };
  return (
    <div className={styles.productsWrapper}>
      <div className={styles.searchBar}>
        <SearchBar />
      </div>
      <div className={styles.pageContent}>
        <div className={styles.filterBar}>
          <FilterBar setQuery={setParams} params={params} />
        </div>
        <div className={styles.ProductBar}>
          <Label content="Products">
            <Stack spacing={2}>
              <Pagination
                count={pagesCount}
                showFirstButton={false}
                showLastButton={false}
                siblingCount={1}
                onChange={handlePageClick}
                className={styles.pagination_btn}
              />
            </Stack>
          </Label>
          <div className={styles.items}>
            <div className={styles.pagination}>
              <PaginatedItems data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
