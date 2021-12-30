/* eslint-disable react/require-default-props */
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { readProductDto } from "@/api/types/newProduct/rProductDto";
import productsApi from "@/api/httpService/products/productsApi";
import modalType from "./modalType";
import endpoints from "@/api/endpoints";
import { toast } from "react-toastify";

interface EditProps {
  editableProduct?: readProductDto;
  setDeletable?: (e: { name: string; id: number }) => void;
  setOpenCheck?: (e: boolean) => void;
  setOpen: (e: boolean) => void;
  providedModalType: string;
}

function EditProduct(props: EditProps) {
  const { editableProduct, setDeletable, setOpenCheck, setOpen, providedModalType } = props;

  const [pickUpData, setPickUpData] = useState<{ id: number; name: string }[]>([]);
  const [mnfrData, setMnfrData] = useState<{ id: number; name: string }[]>([]);

  const [name, setName] = useState(editableProduct?.name);
  const [description, setDescription] = useState(editableProduct?.description);
  const [price, setPrice] = useState(editableProduct?.price);
  const [logo, setLogo] = useState<File>();
  const [shape, setShape] = useState(editableProduct?.shape);
  const [pickup, setPickup] = useState(editableProduct?.pickups);
  const [mnfrId, setMnfrId] = useState(editableProduct?.mnfrId);
  const [id, setId] = useState(editableProduct?.id);


  useEffect(() => {
    async function fetchData() {
      const p = await productsApi.apiGetPickUps();
      const m = await productsApi.apiGetMnfrs();

      setPickUpData(p);
      setMnfrData(m);
    }
    fetchData();
  }, []);

  const getdefaultFormData = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("mnfrId", mnfrId);
    formData.append("shape", shape);
    formData.append("pickUpId", pickup);
    formData.append("logo", logo);

    return formData;
  }

  const  handleSubmit = async () => {
    const form = getdefaultFormData();
    let result = undefined;
    if(props.providedModalType === modalType.UPDATE){
        form.append("id", id);
       result = await fetch(endpoints.products, {method:"PUT", body:form})

    }
    else{
      result  = await fetch(endpoints.products, {method:"POST", body:form})

    }
    console.log(...form);


    if(result.status===201){
      toast.success("Haosh")
    }
    else{
      toast.error("ploh");
    }

    props.setOpen(false)
  }

  const handleDelete = async () => {
    const res =  await fetch(`${endpoints.products}/${id}` ,{method:"DELETE"});
    props.setOpen(false);
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.currentTarget.value)} />
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Enter description"  value={description} onChange={(e)=>setDescription(e.currentTarget.value)}/>
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" placeholder="Enter price" value={price} onChange={(e)=>setPrice(Number(e.currentTarget.value))} />
        <Form.Text className="text-muted">Tell people more about our guitars</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Pick up id</Form.Label>
        <Form.Select aria-label="Default select example" value={pickup} onChange={(e)=> setPickup(e.target.value)}>
          <option>Choose pickups</option>
          {pickUpData &&
            pickUpData.map((elem) => {
              return <option value={elem.id}>{elem.name}</option>;
            })}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Select aria-label="Default select example" value={shape} onChange={(e)=> setShape(e.target.value)}>
          <option>Shape of your guitar</option>
          <option value="stratocaster">Stratocaster</option>
          <option value="jazzmaster">Jazzmaster</option>
          <option value="telecaster">Telecaster</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Select aria-label="Default select example" value={mnfrId} onChange={(e)=> setMnfrId(e.target.value)}>
          <option>Manufacturer id</option>
          {mnfrData &&
            mnfrData.map((elem) => {
              return <option value={elem.id}>{elem.name}</option>;
            })}
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Logo</Form.Label>
        <Form.Control type="file" onChange={(e)=> setLogo(e.target.files[0])} />
      </Form.Group>

      <Button variant="primary" type="button" onClick={()=> {handleSubmit()}}>
        Submit
      </Button>
       {
         props.providedModalType===modalType.UPDATE&&(<Button variant="primary" type="button" onClick={()=> {handleDelete()}}>
         delete
       </Button>)
       }
    </Form>
  );
}

export default EditProduct;
