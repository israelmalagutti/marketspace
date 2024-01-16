export type PaymentMethods = "pix" | "card" | "boleto" | "cash" | "deposit";

export type ProductCondition = "new" | "used";

export type ProductDTO = {
  id: string;
  user_id: string;

  name: string;
  description: string;
  price: string;

  thumb: string;

  isNew: boolean;

  acceptTrade: boolean;
};
