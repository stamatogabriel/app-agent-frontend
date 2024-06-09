import { ITourismAgency, TourismAgencyParams, TourismAgencyReturn } from "../../types/TourismAgency";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = '/tourism-agency'

function parseQueryParams(params: TourismAgencyParams) {
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

  if (params.cnpj) {
    queryParams.append('cnpj', params.cnpj)
  }

  if (params.email) {
    queryParams.append('email', params.email)
  }

  if (params.dateInit) {
    queryParams.append('dateInit', params.dateInit.toISOString())
  }

  if (params.dateEnd) {
    queryParams.append('dateEnd', params.dateEnd.toISOString())
  }

  return queryParams.toString()
}

function getTourismAgencies({ page = 1, limit = 10, name = '', cnpj = '', email = '' }) {
  const queryParams = parseQueryParams({ page, limit, name, cnpj, email })

  return `${endpointUrl}?${queryParams}`
}

function deleteTourismAgencyMutation(tourismAgency: ITourismAgency) {
  return {
    url: `${endpointUrl}/${tourismAgency._id}`,
    method: 'DELETE',
  }
}

function createTourismAgencyMutation(tourismAgency: ITourismAgency) {
  return {
    url: endpointUrl,
    method: 'POST',
    body: tourismAgency,
  }
}

function updateTourismAgencyMutation(tourismAgency: ITourismAgency) {
  return {
    url: `${endpointUrl}/${tourismAgency._id}`,
    method: 'PUT',
    body: tourismAgency,
  }
}

function getTourismAgencyById({ id }: { id: string }) {
  return `${endpointUrl}/${id}`
}

export const tourismAgencyApiSlice = apiSlice.injectEndpoints({
  endpoints: ({query, mutation}) => ({
    getTourismAgencies: query<TourismAgencyReturn, TourismAgencyParams>({
      query: getTourismAgencies,
      providesTags: ['TourismAgencies']
    }),
    deleteTourismAgency: mutation<void, ITourismAgency>({
      query: deleteTourismAgencyMutation,
      invalidatesTags: ['TourismAgencies']
    }),
    createTourismAgency: mutation<void, ITourismAgency>({
      query: createTourismAgencyMutation,
      invalidatesTags: ['TourismAgencies']
    }),
    updateTourismAgency: mutation<void, ITourismAgency>({
      query: updateTourismAgencyMutation,
      invalidatesTags: ['TourismAgencies']
    }),
    getTourismAgency: query<ITourismAgency, { id: string }>({
      query: getTourismAgencyById,
      providesTags: ['TourismAgencies']
    })
  })
})

export const {
  useGetTourismAgenciesQuery,
  useDeleteTourismAgencyMutation,
  useCreateTourismAgencyMutation,
  useUpdateTourismAgencyMutation,
  useGetTourismAgencyQuery
} = tourismAgencyApiSlice