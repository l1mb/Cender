import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ProductsData from "@/api/types/products/productData";
import QueryItem from "@/api/types/products/queryParams";
import Label from "@/elements/home/labelElement/label";
import SortDropdown from "@/elements/products/dropdowns/sortDropdown";
import RadioButtons from "@/elements/products/RadioButtons/radiobuttons";

import OrderBy from "@/api/types/products/enums/orderBy";
import OrderType from "@/api/types/products/enums/orderType";
import AgeRating from "@/api/types/products/enums/ageRating";
import Genre from "@/api/types/products/enums/genre";
import QueryParams from "@/types/interfaces/filter/queryParams";
import buildString from "@/types/interfaces/filter/queryString";
import filterData from "@/types/constants/components/products/filter/filterData";
import styles from "./filter.module.scss";

interface FilterProps {
  setQuery: (e: QueryParams) => void;
  platform: string;
}

function FilterBar(props: FilterProps) {
  const [genre, setGenre] = useState<QueryItem>(ProductsData.GenreOptions[0]);
  const [age, setAge] = useState<QueryItem>(ProductsData.AgeOprions[0]);
  const [criteria, setCriteria] = useState<QueryItem>();
  const [type, setType] = useState<QueryItem>();
  const [queryString, setQuery] = useState("");
  const { search } = useLocation();
  const history = useHistory();

  const pushParameters = () => {
    props.setQuery({
      criteria: criteria?.value as OrderBy,
      type: type?.value as OrderType,
      age: age?.value as AgeRating,
      genre: genre?.value as Genre,
    });
  };

  useEffect(() => {
    setQuery(buildString(criteria?.label, type?.label, age.label, genre.label));
    pushParameters();
    if (queryString) {
      history.push(queryString);
    }
  }, [queryString, criteria, type, age, genre, search]);

  return (
    <div className={styles.filterContainer}>
      <Label content={props.platform} classname={styles.firstLabel} />
      <div>
        <Label content={filterData.label.orderBy} classname={styles.labels} />
        <SortDropdown
          label={filterData.label.orderBy}
          value={criteria}
          options={ProductsData.OrderByOptions}
          changeHandler={(e: QueryItem) => setCriteria(e)}
        />
        <SortDropdown
          label={filterData.label.orderType}
          value={type}
          options={ProductsData.OrderTypeOptions}
          changeHandler={(e: QueryItem) => setType(e)}
        />
      </div>
      <div>
        <Label content={filterData.label.genres} classname={styles.labels} />
        <RadioButtons options={ProductsData.GenreOptions} value={genre} changeHandler={(e: QueryItem) => setGenre(e)} />
      </div>
      <div>
        <Label content={filterData.label.age} classname={styles.labels} />
        <RadioButtons options={ProductsData.AgeOprions} value={age} changeHandler={(e: QueryItem) => setAge(e)} />
      </div>
    </div>
  );
}

export default FilterBar;
