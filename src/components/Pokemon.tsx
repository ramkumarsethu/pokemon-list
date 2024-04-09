import React, { CSSProperties } from 'react';
import Species from './Species';
import { useGetPokemonQuery } from '../store/api/apiSlice';
import { PokemonProps } from '../types/Pokemon';
import PokemonImage from './PokemonImage';
import Loading from './Loading';

const CardStyle: CSSProperties = {
  padding: 5,
  border: '1px solid',
  margin: 5,
  display: 'flex',
  boxSizing: 'border-box',
  flexBasis: 250,
  flexGrow: 1,
  columnGap: 5
};

const Pokemon = ({ url }: PokemonProps) => {
  const { data: pokemon, isFetching } = useGetPokemonQuery({ url });

  return (
    <>
      {!isFetching && (
        <div style={CardStyle}>
          <PokemonImage front_default={pokemon?.sprites.other['official-artwork'].front_default} />

          <div style={{ alignSelf: 'center' }}>
            {!isFetching && (
              <div style={{ fontWeight: 'bold' }}>
                {pokemon?.id} | {pokemon?.name}
              </div>
            )}
            {isFetching && <Loading />}
            <div style={{ fontStyle: 'italic', fontSize: 13, marginTop: 2 }}>
              {pokemon?.species.url && <Species url={pokemon.species.url}></Species>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(Pokemon);
