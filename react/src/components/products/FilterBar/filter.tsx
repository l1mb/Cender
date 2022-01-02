import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";

import QueryParams from "@/types/interfaces/filter/queryParams";
import styles from "./filter.module.scss";
import productsApi from "@/api/httpService/products/productsApi";
import Label from "@/elements/home/labelElement/label";

interface FilterProps {
  setQuery: (e: QueryParams) => void;
  params: QueryParams;
}

const orderData: {
  value: string;
  label: string;
}[] = [
  {
    value: "priceAsc",
    label: "Price Ascending",
  },
  {
    value: "priceDesc",
    label: "Price Descending",
  },
  {
    value: "TitleAsc",
    label: "Name Ascending",
  },
  {
    value: "TitleDesc",
    label: "Name Descending",
  },
];

function FilterBar(props: FilterProps) {
  const [vendorData, setVendorData] = useState<
    | {
        id: number;
        vendorName: string;
      }[]
  >([]);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [ageRating, setAgeRating] = useState("16+");

  const [vendor, setVendor] = useState(() => {
    if (vendorData) return vendorData[0];
  });
  // GET THIS FROM QUERY PARAMS;
  const [shape, setShape] = useState<string>();
  const location = useLocation();

  const [orderBy, setOrderBy] = useState<{
    value: string;
    label: string;
  }>();

  useEffect(() => {
    async function fetchData() {
      const r = await productsApi.apiGetVendors();
      setVendorData(r);
      if (r && r.length > 0) {
        setVendor(r[0].vendorName);
      }
    }
    fetchData();
  }, []);

  const pushParameters = () => {
    if (shape) {
      props.setQuery({
        shape,
        orderBy: orderBy?.value,
        ageRating,
        from,
        to,
      });
    }
  };

  useEffect(() => {
    pushParameters();
  }, [shape, orderBy, ageRating, from, to]);

  useEffect(() => {
    setShape(() => {
      switch (location.pathname.split("/").filter((e) => e !== "/")[2]) {
        case "double cut":
          return "d-cut";
        case "jazzmaster":
          return "jazzmaster";
        default:
          return "t-style";
      }
    });
  }, []);

  return (
    <div className={styles.filterContainer}>
      <Label content="Choose whatever you want &#128521;" classname={styles.names} />
      <div>
        <div className={styles.twoColumns}>
          <TextField
            className={styles.inputs}
            id="outlined-basic"
            value={from}
            onChange={(e) => setFrom(e.currentTarget.value)}
            label="From"
            variant="standard"
          />
          <TextField
            className={styles.inputs}
            value={to}
            onChange={(e) => setTo(e.currentTarget.value)}
            id="outlined-basic"
            label="To"
            variant="standard"
          />
        </div>
      </div>
      <TextField
        className={styles.inputs}
        value={ageRating}
        onChange={(e) => setAgeRating(e.currentTarget.value)}
        id="outlined-basic"
        label="Age"
        variant="standard"
      />
      <div className={styles.twoColumns}>
        {vendorData && (
          <FormControl fullWidth className={styles.inputs}>
            <InputLabel id="vendor-select-label">Vendor</InputLabel>

            <Select
              labelId="vendor-select-label"
              id="vendor-select"
              value={vendor}
              label="Vendor"
              onChange={(e) => setVendor(vendorData?.find((k) => k.id === e))}
            >
              {vendorData.map((elem) => (
                <MenuItem value={elem.id}>{elem.vendorName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <FormControl fullWidth className={styles.inputs}>
          <InputLabel id="sort-select-label">Sort</InputLabel>

          <Select
            labelId="sort-select-label"
            id="sort-select"
            value={orderBy?.value}
            label="sort"
            onChange={(e) => {
              console.log(JSON.stringify(e.target.value));
              setOrderBy(orderData?.find((k) => k.value === e.target.value));
            }}
          >
            {orderData && orderData.map((elem) => <MenuItem value={elem.value}>{elem.label}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default FilterBar;
