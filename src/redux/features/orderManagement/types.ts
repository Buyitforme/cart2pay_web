export interface OrderItemVariant {
  size: string;
  color: string;
  quantity: number;
}

export interface OrderItem {
  link: string;
  prize: number | null;
  variant: OrderItemVariant;
}

export interface CreateOrderPayload {
  store: string;
  address: string;
  phone: string;
  email: string;
  details: OrderItem[];
}
