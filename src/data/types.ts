export interface CoffeeOrder {
  orderId: string;
  orderDate: string;
  customerName: string;
  country: string;
  quantity: number;
  unitPrice: number;
  sales: number;
  coffeeType: string;
  roastType: string;
  size: number;
  loyaltyCard: string;
  year: number;
  month: number;
  monthName: string;
}

export interface Filters {
  year: string;
  coffeeType: string;
  country: string;
  roastType: string;
}
