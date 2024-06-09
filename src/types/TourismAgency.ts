export interface ITourismAgency {
  _id?: string;
  cnpj: string;
  name: string;
  email: string;
  phone?: string | null;
  is_active?: boolean;
  created_at?: Date;
}

export interface TourismAgencyReturn {
  data: ITourismAgency[];
  total_pages: number;
  limit: number;
  page: number;
}

export interface TourismAgencyParams {
  page?: number;
  limit?: number;
  name?: string;
  cnpj?: string;
  email?: string;
  dateInit?: Date;
  dateEnd?: Date;
}