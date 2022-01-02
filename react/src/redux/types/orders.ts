interface PreOrderState {
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  title: string;
  price: number;
}

export default PreOrderState;
