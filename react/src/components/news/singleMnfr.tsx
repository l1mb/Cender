import { useSelector } from "react-redux";
import { Button, FormLabel } from "react-bootstrap";
import mnfrReadDto from "@/types/interfaces/news/nmfrs";
import styles from "./style.module.scss";
import roles from "@/types/constants/roles/roles";
import StateType from "@/redux/types/stateType";
import news from "@/types/interfaces/news/news";

interface MNFR {
  mnfr: mnfrReadDto;
  handlers: {
    handleCreate: (id: number) => void;
    handleDelete: (e: number) => void;
    handleUpdate: (e: news, id: number) => void;
  };
}

interface yj {
  role: string;
  news: news;
  handlers: {
    handleDelete: (e: number) => void;
    handleUpdate: (e: news, id: number) => void;
  };
}

function Новость(prop: yj) {
  return (
    <div>
      <p>{prop.news.news}</p>
      <p>{prop.news.date}</p>
      {prop.role === roles.admin && (
        <div className={styles.btns}>
          <Button
            variant="outline-light"
            onClick={() => {
              prop.handlers.handleDelete(prop.news.id);
            }}
          >
            Delete
          </Button>
          <Button
            variant="outline-light"
            onClick={() => {
              prop.handlers.handleUpdate(prop.news, prop.news.id);
            }}
          >
            Update
          </Button>
        </div>
      )}
    </div>
  );
}

function SingleMnfr(props: MNFR) {
  const role = useSelector<StateType, string>((state) => state.role);

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerLine}>
        <FormLabel>{props.mnfr.name}</FormLabel>
        <Button
          variant="outline-light"
          onClick={() => {
            props.handlers.handleCreate(props.mnfr.id);
          }}
        >
          Create
        </Button>
      </div>
      {(props.mnfr.news)&& (props.mnfr.news.length>0) && props.mnfr.news.map((elem) => (
        <Новость handlers={props.handlers} key={elem.id} role={role} news={elem} />
      ))}
    </div>
  );
}

export default SingleMnfr;
