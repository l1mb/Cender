import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, NavLink } from "react-router-dom";
import emptyCart from "src\\assets\\images\\cart\\empty-cart.png";
import { toast } from "react-toastify";
import Spinner from "@/elements/home/spinnerElement/spinner";
import styles from "./cart.module.scss";
import StateType from "@/redux/types/stateType";
import PreOrderState from "@/redux/types/orders";
import SorryImage from "@/elements/cart/sorryImage/sorryImage";
import RoutesData from "../routesComponent/types/routes/RoutesData";
import getOptions from "@/api/httpService/tokenedOptions";
import getEmail from "@/helpers/token/getUsername";

const CartRow = React.lazy(() => import("@/elements/cart/cartItemElement/cartRow"));
interface Order {
  orderId: number;
  products: {
    title: string;
    vendor: string;
    rating: string;
    price: number;
  }[];
}

function Cart() {
  const cutOrders = useSelector<StateType, PreOrderState>((state) => state.orders).items;
  const [price, setPrice] = useState(0);
  const [prevOrderIds, setPrevOrderIds] = useState<number[]>([]);
  const [prevOrders, setPrevOrders] = useState<Order[]>([]);

  const handleSubmit = async () => {
    const email = getEmail();
    const body = { userEmail: email, products: cutOrders };
    const res = await fetch("/api/create-order", getOptions("POST", true, body));
    if (res.status === 200) {
      toast.success("completed successfully");
    }
  };

  useEffect(() => {
    async function fetchIds() {
      const res = await fetch("/api/get-user-orders-ids", getOptions("GET", true));
      if (res.status === 200) {
        setPrevOrderIds((await res.json()) as number[]);
      }
    }

    fetchIds();
  }, []);

  useEffect(() => {
    function fetchIds() {
      Promise.all(
        prevOrderIds.map((elem) => fetch(`/api/get-order-info?orderId=${elem}`, getOptions("GET", true)))
      ).then((values) => {
        values.forEach(async (el) => {
          const res = await el.json();
          setPrevOrders((prevState) => prevState?.concat(res));
        });
      });
    }

    if (prevOrderIds.length > 0) {
      fetchIds();
    }
  }, [prevOrderIds]);

  useEffect(() => {
    console.log(JSON.stringify(prevOrders));
  }, [prevOrders]);

  useEffect(() => {
    const data = prevOrders
      ? prevOrders.map((e) => e.products.map((q) => q.price).reduce((f, s) => f + s, 0)).reduce((acc, a) => acc + a, 0)
      : cutOrders.map((e) => Number(e.price)).reduce((acc, a) => acc + a, 0);
    setPrice(data);
  }, [cutOrders, prevOrders]);

  const getContent = () => {
    if (cutOrders.length > 0) {
      return (
        <>
          <h2>Your cart</h2>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>title</th>
                <th>price</th>
              </tr>
            </thead>
            <tbody>
              {cutOrders.length &&
                cutOrders.length > 0 &&
                cutOrders.map((u) => (
                  <tr key={`${u.title}`}>
                    <td>{u.id}</td>
                    <td>{u.title}</td>
                    <td>{u.price}</td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr className={styles.removeButton}>
                <td>{cutOrders && <span>Total cost: {price}$</span>}</td>
                <td>
                  <input type="button" value="Buy" onClick={handleSubmit} />
                </td>
              </tr>
            </tfoot>
          </table>
        </>
      );
    }
    if (prevOrders.length > 0) {
      return (
        <>
          <h2>Your previous items</h2>
          <table>
            <thead>
              <tr>
                <th>Order id</th>
                <th>title</th>
                <th>vendor</th>
                <th>rating</th>
                <th>price</th>
              </tr>
            </thead>
            <tbody>
              {prevOrders.length &&
                prevOrders.length > 0 &&
                prevOrders.map((u) =>
                  u.products.map((e, index) => (
                    <tr key={`${u.orderId}`}>
                      <td>{index > 0 ? "" : u.orderId}</td>
                      <td>{e.title}</td>
                      <td>{e.vendor}</td>
                      <td>{e.rating}</td>
                      <td>{e.price}</td>
                    </tr>
                  ))
                )}
            </tbody>
            <tfoot>
              <tr className={styles.removeButton}>
                <td>{cutOrders && <span>Total spent: {price}$</span>}</td>
              </tr>
            </tfoot>
          </table>
        </>
      );
    }
    return (
      <SorryImage label="Your cart is empty" image={emptyCart} className={styles.sorryImage}>
        <h2>Your cart is empty</h2>
        <NavLink to={RoutesData.products[0].route}>Add some products into your cart</NavLink>
      </SorryImage>
    );
  };

  return (
    <div className={styles.cartWrapper}>
      <div className={styles.tableContainer}>
        <Suspense fallback={<Spinner />}>{getContent()}</Suspense>
      </div>
    </div>
  );
}

export default Cart;
