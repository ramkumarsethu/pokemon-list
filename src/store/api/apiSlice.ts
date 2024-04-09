import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import { Pokemon, PokemonListResult, PokemonProps } from '../../types/Pokemon';
import { setToastMessage } from '../slices/ToastSlice';

const baseQuery = fetchBaseQuery({});
const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    //dispatch error to the toast container
    api.dispatch(setToastMessage(JSON.stringify(result.error)));
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonListResult, PokemonProps>({
      query: ({ url }) => `${url}`
    }),
    getPokemon: builder.query<Pokemon, PokemonProps>({
      query: ({ url }) => url
    }),
    getSpecies: builder.query<Pick<Pokemon, 'flavor_text_entries'>, PokemonProps>({
      query: ({ url }) => url
    })
  })
});

export const { useGetPokemonListQuery, useGetPokemonQuery, useGetSpeciesQuery } = apiSlice;
