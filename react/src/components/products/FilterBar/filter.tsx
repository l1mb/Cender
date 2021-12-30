import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductsData from "@/api/types/products/productData";
import QueryItem from "@/api/types/products/queryParams";
import SortDropdown from "@/elements/products/dropdowns/sortDropdown";

import OrderType from "@/api/types/products/enums/orderType";
import QueryParams from "@/types/interfaces/filter/queryParams";
import filterData from "@/types/constants/components/products/filter/filterData";
import styles from "./filter.module.scss";
import StateType from "@/redux/types/stateType";
import productsApi from "@/api/httpService/products/productsApi";
import Label from "@/elements/home/labelElement/label";

interface FilterProps {
  setQuery: (e: QueryParams) => void;
}

function FilterBar(props: FilterProps) {
  const [orderby, setorderby] = useState<{ label: string; value: string }>(ProductsData.OrderByOptions[0]);
  const [type, setType] = useState<QueryItem>(ProductsData.OrderTypeOptions[0]);
  const [vendorData, setVendorData] = useState<
    | {
        id: number;
        vendorName: string;
      }[]
    | null
  >([]);

  const [vendor, setVendor] = useState(vendorData);
  // GET THIS FROM QUERY PARAMS;
  const [shape, setShape] = useState<string>();
  const [queryString, setQuery] = useState("");
  const { search } = useLocation();

  const [pickUpData, setPickUpData] = useState<{ id: number; name: string }[]>();
  const [mnfrData, setMnfrData] = useState<{ id: number; name: string }[]>();

  const role = useSelector<StateType, string>((state) => state.role);

  useEffect(() => {
    async function fetchData() {
      const r = await productsApi.apiGetVendors();
      console.log(r);
      setVendorData(r);
      if (r && r.length > 0) {
        setVendor(r[0].vendorName);
      }
    }
    fetchData();
  }, []);

  const pushParameters = () => {
    props.setQuery({
      orderby: orderby?.value,
      type: type?.value as OrderType,
      limit: 6,
      offset: 0,
      shape,
    });
  };

  useEffect(() => {
    pushParameters();
  }, []);

  return (
    <div className={styles.filterContainer}>
      <Label content="Vendor" classname={styles.names} />
      <div>
        <Label content={filterData.label.orderBy} classname={styles.names} />
        <SortDropdown
          label={filterData.label.orderBy}
          options={ProductsData.OrderByOptions}
          value={orderby}
          changeHandler={(e: QueryItem) => setorderby(e)}
        />
        {vendorData && (
          <SortDropdown
            value={vendor}
            label="Vendor"
            options={vendorData}
            changeHandler={(e: { id: number; vendorName: string }) => setType(e)}
          />
        )}
      </div>
    </div>
  );
}

export default FilterBar;
