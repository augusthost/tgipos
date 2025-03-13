export interface LinkModelType{
   _model: string;
   _id: string;
}

interface BaseEntity{
  _id?: string;
  _state?: number;
  _modified?: number;
  _mby?: string;
  _created?: number;
  _cby?: string;
}

export interface Menu extends BaseEntity{
  name: string;
  price: number;
  image: string;
  description: string;
  category: any;
  available: boolean;
}

export enum TableStatus{
  Available = "available",
  Occupied = "occupied",
  Reserved = "reserved",
}

export enum OrderStatus {
  Pending = "pending",
  InProgress = "in-progress",
  Completed = "completed",
  Cancelled = "cancelled",
}

export enum OrderType {
  DineIn = "dine-in",
  TakeAway = "take-away",
}

export interface Order extends BaseEntity{
  table : any;
  customer: any;
  status: OrderStatus;
  order_type?: OrderType;
  total_amount: number;
}

export interface OrderItem extends Menu{
  order: any;
  menu: any;
  quantity: number;
  special_instruction: string;
}

export interface Category extends BaseEntity{
  name: string;
  description: string;
  image:string;
  _pid: string,
  _o: string;
}

export interface Table extends BaseEntity{
  table_number?: string;
  seats?: string;
  location?:string;
  status: string;
}