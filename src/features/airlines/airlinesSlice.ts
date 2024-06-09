import { IAirline, IAirlineParams, IAirlineReturn } from "../../types/Airline";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = '/airlines'

function parseQueryParams(params: IAirlineParams) {
  const queryParams = new URLSearchParams()

  if (params.page) {
    queryParams.append('page', params.page.toString())
  }

  if (params.limit) {
    queryParams.append('limit', params.limit.toString())
  }

  if (params.name) {
    queryParams.append('name', params.name)
  }

  if (params.country) {
    queryParams.append('country', params.country)
  }

  if (params.dateInit) {
    queryParams.append('dateInit', params.dateInit.toISOString())
  }

  if (params.dateEnd) {
    queryParams.append('dateEnd', params.dateEnd.toISOString())
  }

  return queryParams.toString()
}

function getAirlines({ page = 1, limit = 10, name = '', country = '' }) {
  const queryParams = parseQueryParams({ page, limit, name, country })

  return `${endpointUrl}?${queryParams}`
}

function deleteAirlineMutation(airline: IAirline) {
  return {
    url: `${endpointUrl}/${airline._id}`,
    method: 'DELETE',
  }
}

function createAirlineMutation(airline: IAirline) {
  return {
    url: endpointUrl,
    method: 'POST',
    body: airline,
  }
}

function updateAirlineMutation(airline: IAirline) {
  return {
    url: `${endpointUrl}/${airline._id}`,
    method: 'PUT',
    body: airline,
  }
}

function getAirlineById({ id }: { id: string }) {
  return `${endpointUrl}/${id}`
}

export const airlineApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getAirlines: query<IAirlineReturn, IAirlineParams>({
      query: getAirlines,
      providesTags: ['Airlines'],
    }),
    deleteAirline: mutation<void, IAirline>({
      query: deleteAirlineMutation,
      invalidatesTags: ['Airlines'],
    }),
    createAirline: mutation<IAirline, IAirline>({
      query: createAirlineMutation,
      invalidatesTags: ['Airlines'],
    }),
    updateAirline: mutation<IAirline, IAirline>({
      query: updateAirlineMutation,
      invalidatesTags: ['Airlines'],
    }),
    getAirline: query<IAirline, { id: string }>({
      query: getAirlineById,
      providesTags: ['Airlines'],
    }),
  })
})

export const {
  useGetAirlinesQuery,
  useCreateAirlineMutation,
  useDeleteAirlineMutation,
  useUpdateAirlineMutation,
  useGetAirlineQuery,
} = airlineApiSlice