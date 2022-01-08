import React from "react";
import { useDispatch } from "react-redux";
import Label from "@/elements/home/labelElement/label";
import ProductInteractions from "@/redux/actions/products/productInterator";
import ProductActions from "@/redux/actions/products/productActionTypes";
import styles from "./sureCheck.module.scss";

interface SureProps {
  setOpen: (e: boolean) => void;
  setOpenCheck: (e: boolean) => void;
  product: { name: string; id: number };
  setDeletable: (e?: { name: string; id: number }) => void;
}

function SureCheck(props: SureProps) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(ProductInteractions(ProductActions.DELETE, props.product.id));
  };

  const defaultBehaviour = () => {
    props.setDeletable(undefined);

    props.setOpen(false);
    props.setOpenCheck(false);
  };

  return (
    <div className={styles.sureWrapper}>
      <Label content={`Are you sure you want to delete ${props.product.name}`} />
      <div className={styles.buttons}>
        <button
          type="button"
          onClick={() => {
            handleDelete();
            defaultBehaviour();
          }}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => {
            defaultBehaviour();
          }}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default SureCheck;
