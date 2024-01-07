import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
	reducerPath: 'shazamCoreApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://shazam.p.rapidapi.com',
		prepareHeaders: (headers) => {
			headers.set('X-RapidAPI-Key', 'afa9204e42msh3a3f4abc880325bp1034bfjsn04a794ccfc65');
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getTopCharts: builder.query({
			query: () => '/charts/track?&listId=ip-country-chart-IN&pageSize=20&startFrom=0',
		}),

		getSongByGenre: builder.query({
			query: (genre) => `/charts/track?listId=genre-global-chart-${genre}`,
		}),
		getSongDetails: builder.query({
			query: ({ songid }) => `/songs/get-details?key=${songid}`,
		}),
		getSongRelated: builder.query({
			query: ({ songid }) => `/songs/list-recommendations?key=${songid}`,
		}),
		getArtistDetails: builder.query({
			query: ({ artistId }) => `/songs/list-artist-top-tracks?id=${artistId}`,
		}),
		getSongsByCountry: builder.query({
			query: () => '/charts/track?listId=ip-country-chart-IN',
		}),
		getSongsBySearch: builder.query({
			query: (searchTerm) => `/search?term=${searchTerm}`,
		}),
	}),
});

export const { useGetTopChartsQuery, useGetSongDetailsQuery, useGetSongRelatedQuery, useGetArtistDetailsQuery, useGetSongsByCountryQuery, useGetSongByGenreQuery, useGetSongsBySearchQuery } =
	shazamCoreApi;
