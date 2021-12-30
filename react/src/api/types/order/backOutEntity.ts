interface BackendOutOrderEntity {
  status: string;
  createOrderDate: Date;
  id: number;
  productId: number;
  applicationUserId: number;
  count: number;
}

export default BackendOutOrderEntity;
