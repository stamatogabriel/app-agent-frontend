import { IUser } from './User'; 
import { IAirline } from './Airline';
import { ITravelPackage } from './TravelPackage';

export interface ITravel {
  _id: string;
  client_id: string;
  travel_package_id: string;
  flights: IFlight[];
  travelers: ITraveler[];
}

export interface ITraveler {
  name: string;
  email: string;
  user_id?: string;
}

export interface IFlight {
  airline_id: string;
  ticket_number: string;
  type: 'going' | 'return';
  date_hour_boarding: Date;
  date_hour_departure: Date;
  airport: string;
}

export interface TravelReturn {
  data: ITravel[];
  total_pages: number;
  limit: number;
  page: number;
}

export interface ITravelParams {
  page?: number;
  limit?: number;
  dateInit?: Date;
  dateEnd?: Date;
}
