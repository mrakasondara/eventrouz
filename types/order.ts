export interface Order {
  id: number;
  status: string;
  total_price: number;
  created_at: string;
  details: Ticket[];
}

interface Ticket {
  id: number;
  event_ticket_date: string | string[];
  event_title: string;
  ticket_category_name: string;
  ticket_code?: string;
  price: number;
  quantity: number;
}

interface Payment {
  id?: number;
  order_id?: number;
  bank?: string;
  fraud_status?: string;
  gross_amount?: string;
  midtrans_transaction_id?: string;
  paid_at?: string;
  payment_status?: string;
  payment_type?: string;
  va_number?: string;
}

export interface OrderDetail extends Order {
  payment?: Payment;
}
