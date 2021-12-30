import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Stack } from "@mui/material";
import useProductFetcher from "@/hooks/loader/loader";
import FilterBar from "./FilterBar/filter";
import styles from "./style.module.scss";
import productsApi from "@/api/httpService/products/productsApi";
import QueryParams from "@/types/interfaces/filter/queryParams";
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
}

interface paginatedProps {
  pagesCount: number;
  params: QueryParams | undefined;
  setParams: (e: QueryParams) => void;
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

  const data = useSelector<StateType, readProductDto[]>((state) => state.products);

  useEffect(() => {
    async function getCount() {
      const res = await productsApi.apiGetCount();
      if (res) {
        setPagesCount(res);
      } else {
        console.log("ne robit");
      }
    }

    getCount();
  }, []);

  const handlePageClick = (event, page) => {
    const t = params;
    if (t) {
      t.limit = 6;
      t.offset = t.limit * page - 6;
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
          <FilterBar setQuery={setParams} />
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
              <PaginatedItems pagesCount={pagesCount} data={data} params={params} setParams={setParams} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
