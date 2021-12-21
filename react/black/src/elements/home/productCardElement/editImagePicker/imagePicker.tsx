import AgeRating from "@/api/types/Products/enums/ageRating";
import Genre from "@/api/types/Products/enums/genre";
import Platforms from "@/api/types/Products/enums/platfrom";
import React, { ChangeEvent } from "react";
import styles from "./imagePicker.module.scss";

const ImagePicker: React.FC<{
  label: string;
  setValue: (parameter: Platforms | Genre | AgeRating | File) => void;
}> = (props) => {
  const fileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const regexp = new RegExp(".*.(gif|jpe?g|bmp|png)$");
    if (event.currentTarget.files) {
      if (regexp.test(event.currentTarget.files[0].name)) {
        props.setValue(event.currentTarget.files[0]);
      }
    }
  };
  return (
    <div className={styles.imageContainer}>
      <label htmlFor={props.label}>{props.label}</label>
      <input type="file" name="photo" id={props.label} onChange={(e) => fileChange(e)} accept="image/*" />
    </div>
  );
};

export default ImagePicker;
