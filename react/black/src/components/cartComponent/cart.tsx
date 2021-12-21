import React, { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import emptyCart from "src/assets/images/cart/empty-cart.png";
import orders from "@/api/httpService/orders/orders";
import OrderProduct from "@/types/interfaces/order/orderProducts";
import setCountDispatch from "@/redux/actions/orders/setCount";
import Spinner from "@/elements/home/spinnerElement/spinner";
import cartMessages from "@/types/constants/messages/cart";
import Thead from "@/elements/cart/orderTable/thead";
import orderTheadData from "@/types/constants/components/cart/thead";
import SorryImage from "@/elements/cart/sorryImage/sorryImage";
import orderTypes from "@/types/constants/orders/orderTypes";
import errors from "@/types/constants/errors/errors";
import styles from "./cart.module.scss";
import RoutesData from "../routesComponent/types/routes/RoutesData";

const CartRow = React.lazy(() => import("@/elements/cart/cartItemElement/cartRow"));

const Cart: React.FC = () => {
  const [params, setParams] = useState<OrderProduct[]>([]);
  const [removeId, setId] = useState<number[]>([]);
  const [price, setPrice] = useState(0);

  const history = useHistory();

  const getZipped = async () => {
    const data = await orders.getZippedOrders(orderTypes.uncompleted);
    setParams(data);
  };

  const dispatch = useDispatch();

  const handleRemove = async () => {
    const data = await orders.deleteOrders(
      params
        .filter((elem) => removeId.includes(elem.item.id))
        .map((element) => ({
          id: element.item.id,
          productId: element.item.id,
          applicationUserId: element.item.id,
          count: element.item.id,
        }))
    );

    if (data.status === 204) {
      toast.success(cartMessages.deleteSuccess);
      dispatch(setCountDispatch());
      setParams((prevState) => prevState.filter((m) => !removeId.includes(m.item.id)));
    }
  };

  const changeAmount = async (amount: number, id: number) => {
    const objIndex = params.findIndex((obj) => obj.item.id === id);
    params[objIndex].item.count = amount;

    const data = await orders.updateOrder(params[objIndex].item);

    if (data) {
      toast.success(cartMessages.amountChangedSuccess);
    }
  };

  const handleBuy = async () => {
    const data = await orders.completeOrders();

    if (data.status === 204) {
      toast.success(cartMessages.boughtSuccess);
      dispatch(setCountDispatch());
      history.push(RoutesData.profile.route);
    }
    if (data.status === 500) {
      toast.error(errors.alreadyBought);
    }
  };

  useEffect(() => {
    getZipped();
  }, []);

  useEffect(() => {
    const data = params.map((e) => e.Products.price * e.item.count).reduce((acc, a) => acc + a, 0);
    setPrice(data);
  }, [params]);

  return (
    <div className={styles.cartWrapper}>
      <div className={styles.tableContainer}>
        <Suspense fallback={<Spinner />}>
          {params.length > 0 ? (
            <table>
              <Thead data={orderTheadData} />
              <tbody>
                {params.length > 0 &&
                  params.map((u) => (
                    <CartRow
                      key={u.item.id}
                      id={u.item.id}
                      name={u.Products.name}
                      platform={u.Products.platform}
                      orderDate={u.item.createOrderDate}
                      amount={u.item.count}
                      price={u.Products.price}
                      pushId={setId}
                      changeAmount={changeAmount}
                    />
                  ))}

                <tr className={styles.removeButton}>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td>
                    <input type="button" value="Remove" onClick={handleRemove} disabled={removeId.length === 0} />
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className={styles.removeButton}>
                  <td>{params && <span>Total cost: {price}$</span>}</td>
                  <td>
                    <input type="button" value="Buy" onClick={handleBuy} />
                  </td>
                </tr>
              </tfoot>
            </table>
          ) : (
            <SorryImage label="Your cart is empty" image={emptyCart} className={styles.sorryImage}>
              <h2>Your cart is empty</h2>
              <NavLink to={RoutesData.products[0].route}>Add some products into your cart</NavLink>
            </SorryImage>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default Cart;
