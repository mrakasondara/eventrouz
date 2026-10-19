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
