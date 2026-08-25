import { ticketStore } from "./api";

export interface EventCard {
  id: number;
  title: string;
  description?: string;
  image_thumb_url: string;
  start_at: string;
  end_at: string;
  location: string;
}

export interface ListEvent {
  id?: number;
  title?: string;
  status?: string;
  description?: string;
  image_thumb?: string;
  image_thumb_url?: string;
  start_at?: string;
  end_at?: string;
  location?: string;
}

export interface TicketCategory extends ticketStore {
  id?: number;
}

export interface EventDetail extends ListEvent {
  ticket_categories?: TicketCategory[];
}

export interface Order {
  id?: number;
  created_at?: string;
  status?: string;
  total_price?: number;
  user?: User;
}

interface User {
  id?: number;
  created_at?: string;
  email?: string;
  name?: string;
  updated_at?: string;
}

export interface Detail {
  id?: number;
  ticket_code?: string;
  quantity?: number;
  price?: number;
  ticket_category_name?: string;
  event_title?: string;
}

export interface OrderDetail extends Order {
  details?: Detail[];
}
