export type Address = {
  fullName: string;
  line1: string;
  line2: string;
  city: string;
  postal: string;
  country: string;
  phone: string;
};

export type CheckoutItem = {
  id: string;
  quantity: number;
};

export type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  unitPriceCents: number;
};

export type Order = {
  orderId: string;
  items: OrderItem[];
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  address: Address;
  userId?: string;
};
