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

export interface editPersonalInformation {
  token?: string;
  data: dataPersonalInformation;
}

interface dataPersonalInformation {
  address: string;
  phone_number: string;
  gender: string;
}
