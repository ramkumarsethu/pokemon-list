import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Pokemon, PokemonListResult } from "../../types/Pokemon";
import { setToastMessage } from "../slices/ToastSlice";

export type QueryReturnValue<T = unknown, E = unknown, M = unknown> =
  | {
      error: E;
      data?: undefined;
      meta?: M;
    }
  | {
      error?: undefined;
      data: T;
      meta?: M;
    };

const baseQuery = fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2" });
const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    //dispatch error to the toast container
    api.dispatch(setToastMessage(JSON.stringify(result.error)));
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "pokemonApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonListResult, { url: string }>({
      queryFn: async (args, _api, _extraOptions, baseQuery) => {
        const result = await baseQuery(args);
        return result as QueryReturnValue<
          PokemonListResult,
          FetchBaseQueryError,
          {}
        >;
      },
    }),
    getPokemon: builder.query<Pokemon, { id: string | undefined }>({
      query: ({ id }) => `pokemon/${id}`,
      transformResponse: (baseQueryReturnValue) => {
        const pokemon = baseQueryReturnValue as Pokemon;
        const { name, id, species, sprites } = pokemon;
        const transformedPokemon: Pokemon = {
          name,
          id,
          species,
          sprites: {
            other: {
              "official-artwork": {
                front_default: sprites.other["official-artwork"].front_default,
              },
            },
          },
        };
        return transformedPokemon;
      },
    }),
    getSpecies: builder.query<
      Pick<Pokemon, "flavor_text_entries">,
      { id: string }
    >({
      query: ({ id }) => `pokemon-species/${id}`,
    }),
  }),
});

export const {
  useGetPokemonListQuery,
  useGetPokemonQuery,
  useGetSpeciesQuery,
} = apiSlice;
