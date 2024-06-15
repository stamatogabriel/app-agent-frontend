import { IAirlineReturn } from "../../types/Airline";
import { ITravel, TravelReturn, ITravelParams } from "../../types/Travel";
import { ITravelPackageReturn } from "../../types/TravelPackage";
import { IUserReturn } from "../../types/User";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = '/travels'

function parseQueryParams(params: ITravelParams) {
  const queryParams = new URLSearchParams()

  if (params.page) {
    queryParams.append('page', params.page.toString())
  }

  if (params.limit) {
    queryParams.append('limit', params.limit.toString())
  }

  if (params.dateInit) {
    queryParams.append('dateInit', params.dateInit.toISOString())
  }

  if (params.dateEnd) {
    queryParams.append('dateEnd', params.dateEnd.toISOString())
  }

  return queryParams.toString()
}

function getTravels({ page = 1, limit = 10, dateInit, dateEnd }: ITravelParams) {
  const queryParams = parseQueryParams({ page, limit, dateInit, dateEnd })

  return `${endpointUrl}?${queryParams}`
}

function deleteTravelMutation(travel: ITravel) {
  return {
    url: `${endpointUrl}/${travel._id}`,
    method: 'DELETE',
  }
}

function createTravelMutation(travel: ITravel) {
  return {
    url: endpointUrl,
    method: 'POST',
    body: travel,
  }
}

function updateTravelMutation(travel: ITravel) {
  return {
    url: `${endpointUrl}/${travel._id}`,
    method: 'PUT',
    body: travel,
  }
}

function getTravel({ id }: { id: string }) {
  return `${endpointUrl}/${id}`
}

function getAllTravelPackages() {
  return '/travel-packages'
}

function getAllUsers() {
  return '/users'
}

function getAllAirlines() {
  return '/airlines'
}

export const travelSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getTravels: query<TravelReturn, ITravelParams>({
      query: getTravels,
      providesTags: ['Travel'],
    }),
    deleteTravel: mutation<void, ITravel>({
      query: deleteTravelMutation,
      invalidatesTags: ['Travel'],
    }),
    createTravel: mutation<ITravel, ITravel>({
      query: createTravelMutation,
      invalidatesTags: ['Travel'],
    }),
    updateTravel: mutation<ITravel, ITravel>({
      query: updateTravelMutation,
      invalidatesTags: ['Travel'],
    }),
    getTravel: query<ITravel, { id: string }>({
      query: getTravel,
      providesTags: ['Travel'],
    }),
    getAllTravelPackages: query<ITravelPackageReturn, void>({
      query: getAllTravelPackages,
      providesTags: ['TravelPackages'],
    }),
    getAllUsers: query<IUserReturn, void>({
      query: getAllUsers,
      providesTags: ['Users'],
    }),
    getAllAirlines: query<IAirlineReturn, void>({
      query: getAllAirlines,
      providesTags: ['Airlines'],
    }),
  })
})

export const {
  useGetTravelsQuery,
  useDeleteTravelMutation,
  useCreateTravelMutation,
  useUpdateTravelMutation,
  useGetTravelQuery,
  useGetAllTravelPackagesQuery,
  useGetAllUsersQuery,
  useGetAllAirlinesQuery,
} = travelSlice
