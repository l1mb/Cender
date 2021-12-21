import { useState } from "react";
import _ from "lodash";
import Products from "@/api/httpService/apiGetProducts";
import StateType from "@/redux/types/stateType";
import { useSelector } from "react-redux";
import roles from "@/types/constants/roles/roles";
import styles from "./searchBar.module.scss";
import Dropdown from "./searchDropdown";

interface SearchProps {
  setOpen?: (e: boolean) => void;
  show?: boolean;
}

const SearchBar: React.FC<SearchProps> = (props): JSX.Element => {
  const [results, setResults] = useState<string[]>([]);

  const role = useSelector<StateType, string>((state) => state.role);

  const fetchProducts = async (text: string) => {
    const data = await Products.apiGetSearchProducts(text);
    setResults(data.map((u) => u.name));
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.trim();
    if (text !== "") {
      fetchProducts(text);
    } else {
      setResults([]);
    }
  };

  const debouncedHandler = _.debounce(onInputChange, 300);

  return (
    <div className={styles.searchWrapper}>
      <input type="text" placeholder="Search" className={styles.bar} onChange={debouncedHandler} />
      {role === roles.admin && props.show ? (
        <button
          type="button"
          className={styles.createButton}
          onClick={() => {
            if (props.setOpen) {
              props.setOpen(true);
            }
          }}
        >
          Create
        </button>
      ) : null}

      {results.length > 0 && (
        <div>
          <Dropdown names={results} />
        </div>
      )}
    </div>
  );
};
export default SearchBar;
