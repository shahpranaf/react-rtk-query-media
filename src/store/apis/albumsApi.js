import { faker } from '@faker-js/faker';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const pause = (duration) => {
    return new Promise(resolve => {
        setTimeout(resolve, duration)
    })
}

const albumsApi = createApi({
   reducerPath: 'albums',
   baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL || 'http://localhost:3005',
    fetchFn: async (...args) => {
        await pause(1000);
        return fetch(...args);
    }
   }),
   endpoints(builder) {
    return {
        fetchAlbums: builder.query({
            providesTags: (result, error, user) => {
                const userAlbumsTag = {
                    type: 'UserAlbums',
                    id: user.id
                };

                const AlbumsTag = result?.map(album => ({ type: 'Album', id: album.id })) || []
                return [userAlbumsTag, ...AlbumsTag]
            },
            query: (user) => {
                return {
                    url: '/albums',
                    params: {
                        userId: user.id
                    },
                    method: 'GET'
                }
            }
        }),
        addAlbum: builder.mutation({
            invalidatesTags: (result, error, user) => {
                return [
                    {
                        type: 'UserAlbums',
                        id: user.id
                    }
                ]
            },
            query: (user) => {
                return {
                    url: '/albums',
                    method: 'POST',
                    body: {
                        title: faker.commerce.productName(),
                        userId: user.id
                    }
                }
            }
        }),
        deleteAlbum: builder.mutation({
            invalidatesTags: (result, error, album) => {
                return [
                    {
                        type: 'Album',
                        id: album.id
                    }
                ]
            },
            query: (album) => {
                return {
                    url: `/albums/${album.id}`,
                    method: 'DELETE'
                }
            }
        })
    }
   }

})
export const { useFetchAlbumsQuery, useAddAlbumMutation, useDeleteAlbumMutation } =  albumsApi;

export { albumsApi };