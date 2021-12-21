/* eslint-disable react/require-default-props */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import AgeRating from "@/api/types/products/enums/ageRating";
import Genre from "@/api/types/products/enums/genre";
import Platforms from "@/api/types/products/enums/platfrom";
import IGroupedProduct from "@/api/types/products/IGroupedProduct";
import PostProductDto from "@/api/types/products/postGame";
import Label from "@/elements/home/labelElement/label";
import EditDropdown from "@/elements/home/productCardElement/editDropdown/editDropdown";
import ImagePicker from "@/elements/home/productCardElement/editImagePicker/imagePicker";
import EditInputElement from "@/elements/home/productCardElement/editInputs/editInputElement";
import detectParameterType from "@/helpers/basic/detectParameters";
import StringIsNumber from "@/helpers/basic/isString";
import ProductActions from "@/redux/actions/products/productActionTypes";
import ProductInteractions from "@/redux/actions/products/productInterator";
import editData from "@/types/constants/adminModals/editGame";
import modalType from "./modalType";
import styles from "./editProduct.module.scss";

interface EditProps {
  editableProduct?: IGroupedProduct;
  setDeletable?: (e: { name: string; id: number }) => void;
  setOpenCheck?: (e: boolean) => void;
  setOpen: (e: boolean) => void;
  providedModalType: string;
}

function EditProduct(props: EditProps) {
  const { editableProduct, setDeletable, setOpenCheck, setOpen, providedModalType } = props;
  const defaultValue: PostProductDto = {
    platform: 0,
    rating: 0,
    genre: 0,
    id: editableProduct?.ids[0].id,
    name: editableProduct?.name,
    developers: editableProduct?.developers,
    publishers: editableProduct?.publishers,
    price: editableProduct?.price,
    count: editableProduct?.count,
    totalRating: editableProduct?.totalRating,
    publicationDate: editableProduct?.publicationDate,
  } as PostProductDto;

  const [updateDto, setUpdateDto] = useState<PostProductDto>({
    ...editableProduct,
    ...defaultValue,
  });

  const dispatch = useDispatch();

  const setValue = (parameter: string | number | Date, name: string) => {
    setUpdateDto((prevState) => ({
      ...prevState,
      [name]: parameter,
    }));
  };

  const setUnusualValue = (parameter: Platforms | Genre | AgeRating | File, name: string) => {
    setUpdateDto((prevState) => ({
      ...prevState,
      [name]: parameter,
    }));
  };

  useEffect(() => {
    const id = editableProduct?.ids.find(
      (n) => Platforms[n.platform as unknown as keyof typeof Platforms] === updateDto.platform
    )?.id;
    if (!id) {
      return;
    }
    setValue(id, "id");
  }, [updateDto.platform]);

  const EditData: { label: string; type: string; name: string; default?: string | number }[] = Object.keys(updateDto)
    .filter((m) => !editData.ignoredProps.includes(m))
    .map((elem) => {
      const data: { label: string; type: string; name: string; default?: string | number } = {
        label: elem.toString(),
        type: detectParameterType(elem),
        name: elem,
      };
      if (editableProduct) {
        data.default = editableProduct[data.name as keyof IGroupedProduct] as string | number;
      }
      return data;
    });

  const buildFormData = (): FormData => {
    const data = new FormData();
    Object.keys(updateDto).forEach((key) =>
      data.append(key, updateDto[key as keyof typeof updateDto] as string | Blob)
    );
    return data;
  };

  const handleRemoveClick = () => {
    if (updateDto.id && editableProduct && setDeletable) {
      setDeletable({ id: updateDto.id, name: editableProduct.name });
    }
    setOpen(false);
    if (setOpenCheck) {
      setOpenCheck(true);
    }
  };

  const handleCreateClick = () => {
    dispatch(ProductInteractions(ProductActions.CREATE, buildFormData()));
    setOpen(false);
  };

  const handleUpdateClick = () => {
    dispatch(ProductInteractions(ProductActions.UPDATE, buildFormData()));

    setOpen(false);
  };

  return (
    <div className={styles.modalWrapper}>
      <Label
        content={providedModalType === modalType.UPDATE ? `Edit card with id ${updateDto.id}` : `Create a new product`}
      />
      <div className={styles.inputs}>
        {EditData.map((element) => (
          <EditInputElement
            key={element.label}
            label={element.label}
            setValue={(e) => setValue(e, element.name)}
            type={element.type}
            name={element.name}
            defaultValue={element.default}
          />
        ))}

        {editData.fileInputs.map((elem) => (
          <ImagePicker key={elem} label={elem} setValue={(e) => setUnusualValue(e, elem.toLowerCase())} />
        ))}

        <EditDropdown
          label="Platforms"
          value={Platforms[updateDto.platform]}
          options={
            editableProduct
              ? editableProduct.ids.map((el) => el.platform.toString())
              : Object.keys(Platforms)
                  .filter(StringIsNumber)
                  .map((key) => Platforms[key as keyof typeof Platforms].toString())
          }
          changeHandler={(e: string) => {
            const key = e as keyof typeof Platforms;
            setUnusualValue(Platforms[key], "platform");
          }}
        />

        <EditDropdown
          label="Genre"
          value={Genre[updateDto.genre]}
          options={Object.keys(Genre)
            .filter(StringIsNumber)
            .map((key) => Genre[key as keyof typeof Genre].toString())}
          changeHandler={(e: string) => {
            const key = e as keyof typeof Genre;
            setUnusualValue(Genre[key], "genre");
          }}
        />
        <EditDropdown
          label="Age rating"
          value={AgeRating[updateDto.rating]}
          options={Object.keys(AgeRating)
            .filter(StringIsNumber)
            .map((key) => AgeRating[key as keyof typeof AgeRating].toString())}
          changeHandler={(e: string) => {
            const key = e as keyof typeof AgeRating;
            setUnusualValue(AgeRating[key], "rating");
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
                handleRemoveClick();
                setOpen(true);
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
