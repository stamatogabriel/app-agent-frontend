export interface IUser {
  _id?: string;
  name: string;
  email: string;
  phone?: string | null;
  is_active?: boolean;
  // password?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface IUserReturn {
  data: IUser[];
  total_pages: number;
  page: number;
  limit: number;
}

export interface IUserParams {
  page?: number;
  limit?: number;
  name?: string;
  email?: string;
  dateInit?: Date;
  dateEnd?: Date;
}