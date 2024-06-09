export interface IAirline {
  _id?: string;
  name: string;
  country: string;
  site_url: string;
  logo_url: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface IAirlineReturn {
  data: IAirline[];
  total_pages: number;
  page: number;
  limit: number;
}

export interface IAirlineParams {
  page?: number;
  limit?: number;
  name?: string;
  country?: string;
  dateInit?: Date;
  dateEnd?: Date;
}