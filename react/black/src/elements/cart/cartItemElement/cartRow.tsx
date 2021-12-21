import OrderItem from "@/types/interfaces/order/orderItem";
import React, { ChangeEvent } from "react";
import QuantityInput from "../quantityElement/quantityInput";
import styles from "./cartrow.module.scss";

interface OrderItemWithId extends OrderItem {
  pushId: (callback: (e: number[]) => number[]) => void;
  changeAmount: (amount: number, id: number) => void;
}

const CartRow: React.FC<OrderItemWithId> = (props) => {
  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.checked;

    props.pushId((prevState: number[]) => (value ? [...prevState, props.id] : prevState.filter((m) => m !== props.id)));
  };

  return (
    <tr className={styles.row}>
      <td>
        <input type="checkbox" onChange={handleCheck} />
      </td>
      <td>{props.name}</td>
      <td>{props.platform}</td>
      <td>{props.orderDate}</td>
      <QuantityInput count={props.amount} orderId={props.id} setValue={props.changeAmount} />
      <td>{props.price}</td>
    </tr>
  );
};

export default CartRow;
