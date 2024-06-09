import { IUser, IUserParams, IUserReturn } from '../../types/User'
import { apiSlice } from '../api/apiSlice'

const endpointUrl = '/users'

function parseQueryParams(params: IUserParams) {
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

function getUsers({ page = 1, limit = 10, name = '', email = '' }) {
  const queryParams = parseQueryParams({ page, limit, name, email })

  return `${endpointUrl}?${queryParams}`
}

function deleteUserMutation(user: IUser) {
  return {
    url: `${endpointUrl}/${user._id}`,
    method: 'DELETE',
  }
}

function createUserMutation(user: IUser) {
  return {
    url: endpointUrl,
    method: 'POST',
    body: user,
  }
}

function updateUserMutation(user: IUser) {
  return {
    url: `${endpointUrl}/${user._id}`,
    method: 'PUT',
    body: user,
  }
}

function getUser({ id }: { id: string }) {
  return `${endpointUrl}/${id}`
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getUsers: query<IUserReturn, IUserParams>({
      query: getUsers,
      providesTags: ['Users'],
    }),
    deleteUser: mutation<void, IUser>({
      query: deleteUserMutation,
      invalidatesTags: ['Users'],
    }),
    createUser: mutation<IUser, IUser>({
      query: createUserMutation,
      invalidatesTags: ['Users'],
    }),
    updateUser: mutation<IUser, IUser>({
      query: updateUserMutation,
      invalidatesTags: ['Users'],
    }),
    getUser: query<IUser, { id: string }>({
      query: getUser,
      providesTags: ['Users'],
    }),
  })
})

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetUserQuery,
} = userApiSlice;

