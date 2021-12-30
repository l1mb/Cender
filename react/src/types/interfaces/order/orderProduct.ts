interface OrderProduct {
  id: number;
  name: string;
  status: string;
  vendor: string;
  count: number;
  orderDate: string;
  price: string;
  shape: string;
  userId?: number;
  productId?: number;
}
export default OrderProduct;
