import React, { ChangeEvent, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import StateType from "@/redux/types/stateType";
import modalType from "@/components/modalComponent/editProductModal/modalType";
import roles from "@/types/constants/roles/roles";
import errors from "@/types/constants/errors/errors";
import styles from "./productCard.module.scss";
import Spinner from "../spinnerElement/spinner";
import { updateProductDto } from "@/types/dtos/product/productDto";
import { OrderItem } from "@/redux/types/orders";
import actions from "@/redux/actions/actions";

const EditProduct = React.lazy(() => import("@/components/modalComponent/editProductModal/editProduct"));
const SureCheck = React.lazy(() => import("@/components/modalComponent/editProductModal/sureCheck/sureCheck"));
const Modal = React.lazy(() => import("@/components/modalComponent/modalComponent/modal"));

const ProductCard: React.FC<{ product: updateProductDto }> = React.memo(({ product }) => {
  const [deletableProduct, setDeletableProduct] = useState<{ name: string; id: number }>();
  const [isOpenCheck, setOpenCheck] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [count, setCount] = useState("1");

  const dispatch = useDispatch();

  const appState = useSelector<StateType, StateType>((state) => state);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const data = e.currentTarget.value;
    setCount(data);
  };

  const { authenticated } = appState.user;
  const { role } = appState;
  const orders = appState.orders.items;

  useEffect(() => {
    console.log(`items ${JSON.stringify(orders)}`);
  }, [orders]);

  const handleAdd = async () => {
    if (!authenticated) {
      toast.error(errors.authorize);
      return;
    }

    const productId = product.id;

    if (!productId) {
      toast.error(errors.noproduct);
      return;
    }
    const item: OrderItem = {
      id: product.id,
      title: product.title,
      price: product.price,
    };
    console.log(orders.concat(item));
    dispatch(actions.setOrderItems({ items: orders.concat(item) }));
  };

  return (
    <div className={styles.flipCard}>
      <div className={styles.flipInner}>
        <div className={styles.flipFront}>
          <div className={styles.bottomColumns}>
            <p>{product?.title}</p>
            <p>{product?.price}$</p>
            <p>{product?.vendor.vendorName}</p>
            <p>{product?.rating}</p>
          </div>
        </div>
        <div className={styles.flipBack}>
          <div className={styles.backText}>
            <p>{product?.productDescription}</p>
          </div>

          {role === roles.admin ? (
            <button type="button" onClick={() => setOpen(true)}>
              Edit
            </button>
          ) : (
            <div className={styles.inputs}>
              <input type="number" value={count} onChange={handleInput} />
            </div>
          )}
          <button type="button" onClick={handleAdd}>
            Add to cart
          </button>
        </div>
      </div>
      <Suspense fallback={<Spinner />}>
        <Modal setOpen={(e: boolean) => setOpen(e)} isOpen={isOpen || isOpenCheck}>
          {deletableProduct ? (
            <SureCheck
              product={deletableProduct}
              setOpen={setOpen}
              setOpenCheck={setOpenCheck}
              setDeletable={setDeletableProduct}
            />
          ) : (
            <EditProduct
              providedModalType={modalType.UPDATE}
              editableProduct={product}
              setOpen={setOpen}
              setOpenCheck={setOpenCheck}
              setDeletable={setDeletableProduct}
            />
          )}
        </Modal>
      </Suspense>
    </div>
  );
});

export default ProductCard;
