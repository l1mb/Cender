import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ProductActions from "@/redux/actions/products/productActionTypes";
import setProductsDispatch from "@/redux/actions/products/setProduct";
import QueryParams from "@/types/interfaces/filter/queryParams";

interface hookParams {
  params: QueryParams | undefined;
  setParams: (e: QueryParams) => void;
  loading: boolean;
}

const useProductFetcher = (): hookParams => {
  const [loading, setLoading] = useState(false);

  const [params, setParams] = useState<QueryParams>();

  const dispatch = useDispatch();

  const loadWrapper = (callback: () => void) => {
    setLoading(true);
    callback();
    setLoading(false);
  };

  const fetchProducts = () => {
    loadWrapper(() => dispatch(setProductsDispatch(ProductActions.INIT_LIST)));
  };

  const fetchParameteredProducts = () => {
    if (!params) {
      return;
    }
    loadWrapper(() => dispatch(setProductsDispatch(ProductActions.QUERIFIED_LIST, params)));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchParameteredProducts();
  }, [params]);

  return { loading, params, setParams };
};

export default useProductFetcher;
