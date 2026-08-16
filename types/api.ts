export interface userRegister {
  name?: string;
  email: string;
  password: string;
}

export interface typeHandlerAuthAPI {
  url: string;
  method: string;
  token?: string;
  body?: string;
  isImageUpload: boolean;
}

export interface getEvents {
  limit?: number;
  search?: string;
  status?: string;
}

export interface getTicketCategories {
  search?: string;
  token?: string;
}

export interface getTicketDetail {
  token?: string;
  eventId?: string;
  ticketId?: string;
}

export interface updateTicket {
  token?: string;
  eventId?: string;
  ticketId?: string;
  body: ticketStore;
}

export interface addTicketCategories {
  id?: string;
  token?: string;
  body: ticketStore;
}

export interface editPersonalInformation {
  token?: string;
  data: dataPersonalInformation;
}

interface dataPersonalInformation {
  address: string;
  phone_number: string;
  gender: string;
}

export interface ticketStore {
  name: string;
  price: number;
  quota: number;
  reserved: number;
}
