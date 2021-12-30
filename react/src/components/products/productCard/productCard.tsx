import { Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import StateType from "@/redux/types/stateType";
import defaultIMg from "../../../assets/images/profile/default-profile.jpg";
import styles from "./styles.module.scss";
import roles from "@/types/constants/roles/roles";
import getUserId from "@/helpers/token/getUserId";
import CreateOrderModal from "@/components/modalComponent/btEditModal/createOrderModal";
import { updateProductDto } from "@/api/types/newProduct/cuProductDto";

export interface ProductCardProps {
  product: updateProductDto;
  label: string;
  price: number;
  id?: number;
  img?: string;
  setMode: (e: string) => void;
  setProduct: (e: updateProductDto) => void;
}

function ProductCard(props: ProductCardProps) {
  const { product } = props;
  const role = useSelector<StateType, string>((state) => state.role);
  const usrId = getUserId();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    props.setMode("delete");
    props.setProduct({ id: props.id } as updateProductDto);
  };

  const handleUpdate = () => {
    props.setMode("update");
    const user: updateProductDto = product;
    props.setProduct({ ...user });
  };

  const handleAdd = () => {
    setOpen(true);
  };
  return (
    <Card style={{ width: "18rem" }} className={styles.card_container} color="black">
      <Card.Img variant="top" src={props.img ? props.img : defaultIMg} />

      <Card.Body>
        <Card.Title>{props.label}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.price}</Card.Subtitle>
        <Card.Text>{props.product.description}</Card.Text>
        <div>
          {role === roles.admin && (
            <div>
              <Button className={styles.btn} variant="success" onClick={handleUpdate}>
                Update user
              </Button>
              <Button className={styles.btn} variant="alert" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          )}
          <Button className={styles.btn} onClick={handleAdd} variant="primary">
            Add to orders
          </Button>
        </div>
      </Card.Body>
      <CreateOrderModal setOpen={setOpen} show={open} product={props.product} />
    </Card>
  );
}

export default ProductCard;
