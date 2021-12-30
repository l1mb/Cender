import OrderItem from "@/api/types/order/orderItem";
import React, { ChangeEvent } from "react";
import QuantityInput from "../quantityElement/quantityInput";
import styles from "./cartrow.module.scss";

interface OrderItemWithId {
  pushId: (callback: (e: number[]) => number[]) => void;
  changeAmount: (amount: number, id: number) => void;
  name: string;
  shape: string;
  orderDate: string;
  amount: number;
  orderId: number;
  elem:OrderItem;
  price: number;
}

function CartRow(props: OrderItemWithId) {
  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.checked;

    props.pushId((prevState: number[]) =>
      value ? [...prevState, props.orderId] : prevState.filter((m) => m !== props.orderId)
    );
  };

  return (
    <tr className={styles.row}>
      <td>
        <input type="checkbox" onChange={handleCheck} />
      </td>
      <td>{props.elem.userId}</td>
      <td>{props.elem.productId}</td>
      <td>{props.elem.status}</td>
      <QuantityInput elem={props.elem} count={props.elem.count} orderId={props.orderId} setValue={props.changeAmount} />
      <td>{props.elem.orderDate}</td>
    </tr>
  );
}

export default CartRow;
