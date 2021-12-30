import React, { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import emptyCart from "src\\assets\\images\\cart\\empty-cart.png";
import orders from "@/api/httpService/orders/ordersApi";
import setCountDispatch from "@/redux/actions/orders/setCount";
import Spinner from "@/elements/home/spinnerElement/spinner";
import cartMessages from "@/types/constants/messages/cart";
import Thead from "@/elements/cart/orderTable/thead";
import orderTheadData from "@/types/constants/components/cart/thead";
import SorryImage from "@/elements/cart/sorryImage/sorryImage";
import errors from "@/types/constants/errors/errors";
import styles from "./cart.module.scss";
import RoutesData from "../routesComponent/types/routes/RoutesData";
import OrderProduct from "@/types/interfaces/order/orderProduct";

const CartRow = React.lazy(() => import("@/elements/cart/cartItemElement/cartRow"));

function Cart() {
  const [params, setParams] = useState<OrderProduct[]>([]);
  const [removeId, setId] = useState<number[]>([]);
  const [price, setPrice] = useState(0);

  const history = useHistory();

  const getZipped = async () => {
    const data = await orders.getOrders();
    if (data) {
      setParams(data);
    }
  };

  const dispatch = useDispatch();

  const handleRemove = async () => {
    const data = await orders.deleteOrders({
      keys: params.filter((elem) => removeId.includes(elem.id)).map((element) => element.id),
    });

    if (data.status === 204) {
      toast.success(cartMessages.deleteSuccess);
      dispatch(setCountDispatch());
      setParams((prevState) => prevState.filter((m) => !removeId.includes(m.id)));
    }
  };

  const changeAmount = async (amount: number, id: number) => {
    const objIndex = params.findIndex((obj) => obj.id === id);
    params[objIndex].count = amount;

    const data = await orders.updateOrder({
      id: params[objIndex].id,
      productId: params[objIndex].productId,
      applicationUserId: params[objIndex].userId,
    });

    if (data) {
      toast.success(cartMessages.amountChangedSuccess);
    }
  };

  const handleBuy = async () => {
    const data = await orders.completeOrders({
      keys: params.filter((elem) => removeId.includes(elem.id)).map((element) => element.id),
    });

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
    const data = params.map((e) => Number(e.price) * Number(e.count)).reduce((acc, a) => acc + a, 0);
    setPrice(data);
    console.log(params);
  }, [params]);

  return (
    <div className={styles.cartWrapper}>
      <div className={styles.tableContainer}>
        <Suspense fallback={<Spinner />}>
          {params.length > 0 ? (
            <table>
              <Thead data={orderTheadData} />
              <tbody>
                {params.length &&
                  params.length > 0 &&
                  params.map((u) => (
                    <CartRow
                    elem={u}
                      key={u.id}
                      name={u.name}
                      pushId={setId}
                      changeAmount={changeAmount}
                      shape={u.shape}
                      orderDate={u.orderDate}
                      amount={u.count}
                      orderId={u.id}
                      price={Number(u.price)}
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
}

export default Cart;
