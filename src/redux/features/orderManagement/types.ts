export interface OrderItemVariant {
  size: string;
  color: string;
  quantity: number;
}

export interface OrderItem {
  link: string;
  variant: OrderItemVariant;
}

export interface CreateOrderPayload {
  store: string;
  state:string;
  lga:string;
  street: string;
  first_name:string;
  last_name:string;
  phone: string;
  email:string;
  details: OrderItem[];
}
