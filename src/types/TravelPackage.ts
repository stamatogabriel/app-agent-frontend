export interface ITravelPackage {
  _id?: string;
  name: string;
  itinerary: IItinerary[];
}

export interface IItinerary {
  image: string;
  description: string;
}

export interface ITravelPackageReturn {
  data: ITravelPackage[];
  total_pages: number;
  page: number;
  limit: number;
}

export interface ITravelPackageParams {
  page?: number;
  limit?: number;
  dateInit?: Date;
  dateEnd?: Date;
}