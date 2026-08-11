export interface EventCard {
  id: number;
  title: string;
  image_thumb: string;
  start_at: string;
  end_at: string;
  location: string;
}

export interface ListEvent {
  id?: number;
  title?: string;
  status?: string;
  image_thumb?: string;
  start_at?: string;
  end_at?: string;
  location?: string;
}
