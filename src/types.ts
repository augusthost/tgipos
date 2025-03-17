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
  category: LinkModelType[];
  available: boolean;
}

export enum TableStatus{
  Available = "available",
  Occupied  = "occupied",
  Reserved  = "reserved",
}

export enum OrderStatus {
  Pending    = "pending",
  Completed  = "completed",
  Cancelled  = "cancelled",
  Refunded   = "refunded",
}

export enum OrderType {
  DineIn = "dine-in",
  TakeAway = "take-away",
}

export enum OrderItemStatus {
  New       = "new", 
  InKitchen = "in-kitchen",
  Ready     = "ready",
  Cancelled = "cancelled",
  Completed = "completed"
}

export interface Order extends BaseEntity{
  table?: any;
  customer: any;
  status: OrderStatus;
  order_type?: OrderType;
  total_amount: number;
}

export interface OrderItem extends BaseEntity{
  order: any;
  menu: any;
  quantity: number;
  status: OrderItemStatus;
  special_instruction: string;
  price: number
}

export interface Category extends BaseEntity{
  name: string;
  description: string;
  image:string;
  _pid: string,
  _o: string;
  _children: Category[]
}

export interface Table extends BaseEntity{
  table_number?: string;
  seats?: string;
  location?:string;
  status: string;
  order: LinkModelType
}