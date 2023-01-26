export type Product = {
  id: string;
  name: string;
  quantity: number;
  deliveryDate: string;
  price: number;
  currency: 'USD' | 'RUB';
}

export type DataIndex = keyof Product;

export type CurrentProduct = {
  id: string;
  name: string;
  document: string;
}

export type AdaptedProduct = Product & {
  document: string;
}

export type SelectedProducts = [
  {
    document: string;
    productsId: string[];
  }
]
