import React, { useState } from "react";
import { parseInt } from "lodash";
import styles from "./quantity.module.scss";
import edit from "../../../assets/icons/editing.png";
import save from "../../../assets/icons/diskette.png";
import discard from "../../../assets/icons/cancel.png";
import OrderItem from "@/api/types/order/orderItem";

interface quantityProps {
  count: number;
  orderId: number;
  setValue: (e: number, id: number) => void;
  elem: OrderItem;
}

function QuantityInput(props: quantityProps) {
  const [disable, setDisable] = useState(true);

  const [buffer, setBuffer] = useState<string>(props.elem.count.toString());
  const [amount, setAmount] = useState(props.count);

  const handleInput = (e: string) => {
    setBuffer(parseInt(e, 10).toString());
  };

  const handleSave = () => {
    setDisable(true);
    const number = parseInt(buffer, 10);
    setAmount(number);
    props.setValue(number, props.orderId);
  };

  const handleDiscard = () => {
    setDisable(true);
    setBuffer(amount.toString());
  };

  return (
    <td className={styles.inputItem}>
      <input type="number" disabled={disable} min={0} value={buffer} onChange={(e) => handleInput(e.target.value)} />
      <div className={styles.buttons}>
        {disable ? (
          <button
            type="button"
            onClick={() => {
              setDisable(false);
            } }
          >
            <img src={edit} alt="edit" />
          </button>
        ) : (
          <>
            <button type="button" onClick={handleSave}>
              <img src={save} alt="save" />
            </button>
            <button type="button" onClick={handleDiscard}>
              <img src={discard} alt="cancel" />
            </button>
          </>
        )}
      </div>
    </td>
  );
}

export default QuantityInput;
