import React from "react";

interface ImageProps {
  label: string;
  image: string;
  className: string;
}

const SorryImage: React.FC<ImageProps> = (props) => (
  <div className={props.className}>
    {props.children}
    <img src={props.image} alt={props.label} />
  </div>
);

export default SorryImage;
