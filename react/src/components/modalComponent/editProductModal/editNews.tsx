/* eslint-disable react/require-default-props */
import { useState } from "react";
import { useDispatch } from "react-redux";
import Label from "@/elements/home/labelElement/label";
import EditInputElement from "@/elements/home/productCardElement/editInputs/editInputElement";
import modalType from "./modalType";
import styles from "./editProduct.module.scss";
import news from "@/types/interfaces/news/news";
import NewsActions from "@/redux/actions/manufacturers/newsActionTypes";
import MnfrsInteractions from "@/redux/actions/manufacturers/newsInterator";

interface EditProps {
  editableNews?: news;
  mnfrId: number;
  setDeletable?: (e: { name: string; id: number }) => void;
  setOpenCheck?: (e: boolean) => void;
  setOpen: (e: boolean) => void;
  providedModalType: string;
}

function EditNews(props: EditProps) {
  const [asd, setnews] = useState<news>(props.editableNews as news);

  const [новость, setНовость] = useState<string>(props.editableNews?.news as string);
  const dispatch = useDispatch();

  const setValue = (parameter: string) => {
    setНовость(parameter);
  };

  const handleCreateClick = () => {
    dispatch(MnfrsInteractions(NewsActions.CREATE, { manufacturerId: props.mnfrId, news: новость }));
    props.setOpen(false);
  };

  const handleUpdateClick = () => {
    dispatch(MnfrsInteractions(NewsActions.UPDATE, { id: props.editableNews.id, news: новость }));
    props.setOpen(false);
  };

  return (
    <div className={styles.modalWrapper}>
      <Label
        content={
          props.providedModalType === modalType.UPDATE
            ? `Edit card with id ${props.editableNews?.id}`
            : `Create a new product`
        }
      />
      <div className={styles.inputs}>
        <EditInputElement
          label="News"
          setValue={(e) => setValue(e)}
          type="text"
          name="news"
          defaultValue={props.editableNews?.news}
        />
      </div>
      <div className={styles.buttons}>
        {props.providedModalType === modalType.UPDATE ? (
          <button type="button" onClick={handleUpdateClick}>
            Update
          </button>
        ) : (
          <button type="button" onClick={handleCreateClick}>
            Create
          </button>
        )}
      </div>
    </div>
  );
}

export default EditNews;
