export interface Product {
  id: string;
  name: string;
  img: string;
  price: { [size: string]: number };
  isAnimated?: boolean;
  details: ProductDetails;
}

export interface ProductDetails {
  calories: number;
  totalFat: number;
  cholesterol: number;
  sodium: number;
  totalCarbohydrate: number;
  protein: number;
  vitaminD: number;
  cancium: number;
}

export interface CartProduct extends Product {
  size: number;
  withSugar: boolean;
  qty: number;
}
