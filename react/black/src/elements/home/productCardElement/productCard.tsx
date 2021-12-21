import React, { ChangeEvent, Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import IGroupedProduct from "@/api/types/products/IGroupedProduct";
import CategoriesData from "@/components/routesComponent/types/categories/categoriesData";
import Platforms from "@/api/types/products/enums/platfrom";
import StateType from "@/redux/types/stateType";
import orders from "@/api/httpService/orders/orders";
import setCountDispatch from "@/redux/actions/orders/setCount";
import modalType from "@/components/modalComponent/editProductModal/modalType";
import roles from "@/types/constants/roles/roles";
import errors from "@/types/constants/errors/errors";
import SmallPlatfroms from "./smallProductCardPlatforms/smallPlatformCards";
import styles from "./productCard.module.scss";
import Spinner from "../spinnerElement/spinner";

const EditProduct = React.lazy(() => import("@/components/modalComponent/editProductModal/editProduct"));
const SureCheck = React.lazy(() => import("@/components/modalComponent/editProductModal/sureCheck/sureCheck"));
const Modal = React.lazy(() => import("@/components/modalComponent/modalComponent/modal"));

const ProductCard: React.FC<{ product: IGroupedProduct }> = React.memo(({ product }) => {
  const [deletableProduct, setDeletableProduct] = useState<{ name: string; id: number }>();
  const [platform, setPlatform] = useState<Platforms>(product.ids[0].platform);
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

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setPlatform(e.currentTarget.value as unknown as Platforms);
  };

  const handleAdd = async () => {
    if (!userId) {
      toast.error(errors.authorize);
      return;
    }

    const productId = product.ids.find((n) => n.platform === platform)?.id;

    if (!productId) {
      toast.error(errors.noproduct);
      return;
    }

    const order: Response = await orders.postOrder({
      productId,
      applicationUserId: userId,
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
            <p>Rating: {product?.totalRating}</p>
          </div>
        </div>
        <div className={styles.flipBack}>
          <div className={styles.backText}>
            <p>{product?.publishers}</p>
            <p>{product?.genre}</p>
          </div>
          <SmallPlatfroms
            imageSource={CategoriesData.filter((u) => product.platforms.map((m) => m.toString()).includes(u.name))}
          />
          {role === roles.admin ? (
            <button type="button" onClick={() => setOpen(true)}>
              Edit
            </button>
          ) : (
            <div className={styles.inputs}>
              <select defaultValue={Platforms.PC} onChange={handleSelect}>
                {product.ids.map((m) => (
                  <option key={m.id} value={m.platform}>
                    {m.platform}
                  </option>
                ))}
              </select>
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
