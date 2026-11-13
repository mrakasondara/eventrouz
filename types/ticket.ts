export interface Ticket {
  id?: number;
  status_event?: string;
  ticket_code?: string;
  quantity?: number;
  ticket_date?: string;
  ticket_category?: string;
  event_id?: number;
  event_title?: string;
  event_location?: string;
  event_image_thumb_url?: string;
}

export interface QRTicketDialog {
  event_ticket_date?: string | string[];
  event_title?: string;
  event_location?: string;
  ticket_category_name?: string;
  ticket_code?: string;
  quantity?: number;
  is_icon_show?: boolean;
}
