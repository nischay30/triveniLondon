export type Product = {
  id: string;
  name: string;
  type: string;
  note: string;
  priceCents: number;
};

export type CartItem = {
  id: string;
  quantity: number;
};

export type Address = {
  fullName: string;
  line1: string;
  line2: string;
  city: string;
  postal: string;
  country: string;
  phone: string;
};

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  picture?: string;
};

export type OrderResponse = {
  orderId: string;
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    unitPriceCents: number;
  }>;
  address: Address;
};
