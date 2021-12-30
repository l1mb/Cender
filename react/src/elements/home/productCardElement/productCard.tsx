import React, { ChangeEvent, Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import StateType from "@/redux/types/stateType";
import orders from "@/api/httpService/orders/ordersApi";
import setCountDispatch from "@/redux/actions/orders/setCount";
import modalType from "@/components/modalComponent/editProductModal/modalType";
import roles from "@/types/constants/roles/roles";
import errors from "@/types/constants/errors/errors";
import styles from "./productCard.module.scss";
import Spinner from "../spinnerElement/spinner";
import { readProductDto } from "@/api/types/newProduct/rProductDto";

const EditProduct = React.lazy(() => import("@/components/modalComponent/editProductModal/editProduct"));
const SureCheck = React.lazy(() => import("@/components/modalComponent/editProductModal/sureCheck/sureCheck"));
const Modal = React.lazy(() => import("@/components/modalComponent/modalComponent/modal"));

const ProductCard: React.FC<{ product: readProductDto }> = React.memo(({ product }) => {
  const [deletableProduct, setDeletableProduct] = useState<{ name: string; id: number }>();
  const [isOpenCheck, setOpenCheck] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [count, setCount] = useState("1");

  const successMessage = "Added successfully";

  const dispatch = useDispatch();

  const role = useSelector<StateType, string>((state) => state.role);
  const userId = useSelector<StateType, number>((state) => state.user.id);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const data = e.currentTarget.value;
    setCount(data);
  };

  const handleAdd = async () => {
    if (!userId) {
      toast.error(errors.authorize);
      return;
    }

    const productId = product.id;

    if (!productId) {
      toast.error(errors.noproduct);
      return;
    }

    const order: Response = await orders.postOrder({
      productId,
      userId,
      count: parseInt(count, 10),
    });

    if (order.status === 201) {
      toast.success(successMessage);
      dispatch(setCountDispatch());
    } else if (order.status === 500) {
      toast.error(errors.orderExist);
    }
  };

  return (
    <div className={styles.flipCard}>
      <div className={styles.flipInner}>
        <div className={styles.flipFront}>
          <img className={styles.coverImage} src={product.logo} alt="Avatar" />
          <div className={styles.bottomColumns}>
            <p>{product?.name}</p>
            <p>{product?.price}$</p>
            <p>Manufacturer: {product?.mnfrId}</p>
          </div>
        </div>
        <div className={styles.flipBack}>
          <div className={styles.backText}>
            <p>{product?.description}</p>
            <p>{product?.pickups}</p>
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
