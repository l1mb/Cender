import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import mnfrReadDto from "@/types/interfaces/news/nmfrs";
import SingleMnfr from "./singleMnfr";
import Modal from "../modalComponent/modalComponent/modal";
import EditNews from "../modalComponent/editProductModal/editNews";
import modalType from "../modalComponent/editProductModal/modalType";
import newsApi from "@/api/httpService/news/newsApi";
import news from "@/types/interfaces/news/news";

function News() {
  const [data, setData] = useState<mnfrReadDto[]>();
  const [open, setOpen] = useState(false);
  const [modal, setModalType] = useState<string>();
  const [entity, setentity] = useState<news>();
  const [mnId, setMnId] = useState<number>();

  useEffect(() => {
    async function fetchData() {
      const res = await newsApi.getMnfrs();
      setData(res);
    }

    fetchData();
  }, []);

  const handleUpdate = (e: news, id: number) => {
    console.log(`update news ${id}`);
    setModalType(modalType.UPDATE);
    setOpen(true);
    setentity(e);
    setMnId(id);
  };

  const handleDelete = (id: number) => {
    console.log(`delete news ${id}`);
  };

  const handleCreate = (id: number) => {
    setModalType(modalType.CREATE);
    setOpen(true);
    setMnId(id);
  };

  const handlers = {
    handleCreate,
    handleDelete,
    handleUpdate,
  };

  return (
    <div className={styles.extraDiv}>
      <div className={styles.page_wrapper}>
        <div className={styles.page_content}>
          <div className={styles.body}>
            {data && data.map((elem) => <SingleMnfr handlers={handlers} key={elem.id} mnfr={elem} />)}
          </div>
        </div>
      </div>
      <Modal isOpen={open} setOpen={setOpen}>
        <EditNews setOpen={setOpen} editableNews={entity} mnfrId={mnId} providedModalType={modal} />
      </Modal>
    </div>
  );
}

export default News;
