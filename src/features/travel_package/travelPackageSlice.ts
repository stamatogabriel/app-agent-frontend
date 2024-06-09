import { ITravelPackage, ITravelPackageParams, ITravelPackageReturn } from "../../types/TravelPackage";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = '/travel-packages'

function parseQueryParams(params: ITravelPackageParams) {
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

function getTravelPackages({ page = 1, limit = 10 }) {
  const queryParams = parseQueryParams({ page, limit })

  return `${endpointUrl}?${queryParams}`
}

function deleteTravelPackageMutation(travelPackage: ITravelPackage) {
  return {
    url: `${endpointUrl}/${travelPackage._id}`,
    method: 'DELETE',
  }
}

function createTravelPackageMutation(travelPackage: ITravelPackage) {
  return {
    url: endpointUrl,
    method: 'POST',
    body: travelPackage,
  }
}

function updateTravelPackageMutation(travelPackage: ITravelPackage) {
  return {
    url: `${endpointUrl}/${travelPackage._id}`,
    method: 'PUT',
    body: travelPackage,
  }
}

function getTravelPackage({ id }: { id: string }) {
  return `${endpointUrl}/${id}`
}

export const travelPackageSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getTravelPackages: query<ITravelPackageReturn, ITravelPackageParams>({
      query: getTravelPackages,
      providesTags: ['TravelPackages'],
    }),
    deleteTravelPackage: mutation<void, ITravelPackage>({
      query: deleteTravelPackageMutation,
      invalidatesTags: ['TravelPackages'],
    }),
    createTravelPackage: mutation<ITravelPackage, ITravelPackage>({
      query: createTravelPackageMutation,
      invalidatesTags: ['TravelPackages'],
    }),
    updateTravelPackage: mutation<ITravelPackage, ITravelPackage>({
      query: updateTravelPackageMutation,
      invalidatesTags: ['TravelPackages'],
    }),
    getTravelPackage: query<ITravelPackage, { id: string }>({
      query: getTravelPackage,
      providesTags: ['TravelPackages'],
    }),
  })
})

export const {
  useGetTravelPackagesQuery,
  useDeleteTravelPackageMutation,
  useCreateTravelPackageMutation,
  useUpdateTravelPackageMutation,
  useGetTravelPackageQuery,
} = travelPackageSlice
