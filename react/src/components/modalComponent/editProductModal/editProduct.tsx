/* eslint-disable react/require-default-props */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import modalType from "./modalType";
import productsApi from "@/api/httpService/products/productsApi";
import styles from "./editProduct.module.scss";
import Label from "@/elements/home/labelElement/label";
import { productDto, updateProductDto } from "@/types/dtos/product/productDto";
import EditInputElement from "@/elements/home/productCardElement/editInputs/editInputElement";
import EditDropdown from "@/elements/home/productCardElement/editDropdown/editDropdown";
import ProductInteractions from "@/redux/actions/products/productInterator";
import ProductActions from "@/redux/actions/products/productActionTypes";

interface EditProps {
  editableProduct?: updateProductDto;
  setDeletable?: (e: { name: string; id: number }) => void;
  setOpenCheck?: (e: boolean) => void;
  setOpen: (e: boolean) => void;
  providedModalType: string;
}

const shapeData: {
  value: string;
  label: string;
}[] = [
  {
    value: "jazzmaster",
    label: "Jazzmaster",
  },
  {
    value: "t-style",
    label: "Telecaster",
  },
  {
    value: "d-cut",
    label: "Double cut",
  },
];

function EditProduct(props: EditProps) {
  const { editableProduct, setDeletable, setOpenCheck, setOpen, providedModalType } = props;

  const [vendorData, setVendorData] = useState<
    | {
        id: number;
        vendorName: string;
      }[]
  >([]);

  const [vendor, setVendor] = useState(() => {
    if (vendorData) return vendorData[0];
  });

  const [description, setDescription] = useState(editableProduct?.productDescription || "");
  const [title, setTitle] = useState(editableProduct?.title || "");
  const [ageRating, setAgeRating] = useState(editableProduct?.rating || "");
  const [price, setPrice] = useState(editableProduct?.price || "");
  const [shape, setShape] = useState(shapeData[0]);

  useEffect(() => {
    async function fetchData() {
      const r = await productsApi.apiGetVendors();
      setVendorData(r);
      if (r && r.length > 0) {
        setVendor(r[0]);
      }
    }
    fetchData();
  }, []);

  const dispatch = useDispatch();

  const handleRemoveClick = () => {
    // if (updateDto.id && editableProduct && setDeletable) {
    //   setDeletable({ id: updateDto.id, name: editableProduct.name });
    // }
    // setOpen(false);
    // if (setOpenCheck) {
    //   setOpenCheck(true);
    // }
  };

  useEffect(() => {
    const dto: productDto = {
      title,
      productDescription: description,
      price,
      rating: ageRating,
      vendor: vendor?.vendorName || "",
    };
    console.log(dto);
  }, [title, description, price, ageRating, vendor]);

  const handleCreateClick = () => {
    const dto: productDto = {
      title,
      productDescription: description,
      price,
      rating: ageRating,
      vendor: vendor?.vendorName || "",
      shape: shape.value,
    };
    dispatch(ProductInteractions(ProductActions.CREATE, dto));
    setOpen(false);
  };

  const handleUpdateClick = () => {
    // dispatch(ProductInteractions(ProductActions.UPDATE, buildFormData()));
    const dto: updateProductDto = {
      id: editableProduct?.id,
      title,
      productDescription: description,
      price,
      rating: ageRating,
      vendor: vendor?.vendorName || "",
      shape: shape.value,
    };
    dispatch(ProductInteractions(ProductActions.UPDATE, dto));
    setOpen(false);
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     const p = await productsApi.apiGetPickUps();
  //     const m = await productsApi.apiGetMnfrs();

  //     setPickUpData(p);
  //     setMnfrData(m);
  //   }
  //   fetchData();
  // }, []);

  // const getdefaultFormData = () => {
  //   const formData = new FormData();
  //   formData.append("name", name);
  //   formData.append("description", description);
  //   formData.append("price", price);
  //   formData.append("mnfrId", mnfrId);
  //   formData.append("shape", shape);
  //   formData.append("pickUpId", pickup);

  //   return formData;
  // };

  // const handleSubmit = async () => {
  //   const form = getdefaultFormData();
  //   let result;
  //   if (props.providedModalType === modalType.UPDATE) {
  //     form.append("id", id);
  //     result = await fetch(endpoints.products, { method: "PUT", body: form });
  //   } else {
  //     result = await fetch(endpoints.products, { method: "POST", body: form });
  //   }

  //   if (result.status === 201) {
  //     toast.success("Haosh");
  //   } else {
  //     toast.error("ploh");
  //   }

  //   props.setOpen(false);
  // };

  const handleDelete = () => {
    if (editableProduct?.id && editableProduct && setDeletable) {
      setDeletable({ id: editableProduct.id, name: editableProduct.title });
    }
    setOpen(false);
    if (setOpenCheck) {
      setOpenCheck(true);
    }
  };

  return (
    <div className={styles.modalWrapper}>
      <Label
        content={
          providedModalType === modalType.UPDATE ? `Edit card with id ${editableProduct.id}` : `Create a new product`
        }
      />
      <div className={styles.inputs}>
        <EditInputElement
          label="Title"
          setValue={(e) => setTitle(e)}
          type="text"
          name={title}
          value={title}
          defaultValue={title}
        />
        <EditDropdown
          label="Vendors"
          value={vendor?.vendorName || ""}
          options={vendorData.map((elem) => elem.id)}
          changeHandler={(e: string) => {
            setVendor(vendorData.find((elem) => elem.vendorName === e));
          }}
        />
        <EditInputElement
          label="Rating"
          setValue={(e) => setAgeRating(e)}
          type="text"
          name={ageRating}
          value={ageRating}
          defaultValue={ageRating}
        />
        <EditInputElement
          label="Description"
          setValue={(e) => setDescription(e)}
          type="text"
          name={description}
          value={description}
          defaultValue={description}
        />
        <EditInputElement
          label="Price"
          setValue={(e) => setPrice(e)}
          type="text"
          name={price}
          value={price}
          defaultValue={price}
        />
        <EditDropdown
          label="Shape"
          value={shape.label || ""}
          options={shapeData.map((elem) => elem.label)}
          changeHandler={(e: string) => {
            setShape(shapeData.find((elem) => elem.label === e));
          }}
        />
      </div>
      <div className={styles.buttons}>
        {providedModalType === modalType.UPDATE ? (
          <>
            <button type="button" onClick={handleUpdateClick}>
              Update
            </button>
            <button
              type="button"
              onClick={() => {
                handleDelete();
              }}
            >
              Delete
            </button>
          </>
        ) : (
          <button type="button" onClick={handleCreateClick}>
            Create
          </button>
        )}
      </div>
    </div>
  );
}

export default EditProduct;
