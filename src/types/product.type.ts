export interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export interface NewProduct {
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface Category {
  value: string;
  label: string;
}
