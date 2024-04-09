import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pokemon, PokemonListResult, PokemonProps } from '../../types/Pokemon';

export const apiSlice = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({}),
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
