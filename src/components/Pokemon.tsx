import React, { CSSProperties } from 'react';
import Species from './Species';
import { useGetPokemonQuery } from '../store/api/apiSlice';
import { PokemonProps } from '../types/Pokemon';

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
          {pokemon?.sprites.other['official-artwork'].front_default && (
            <img
              src={pokemon?.sprites.other['official-artwork'].front_default}
              style={{ height: 100, width: 100, alignSelf: 'center' }}></img>
          )}
          {!pokemon?.sprites.other['official-artwork'].front_default && (
            <div
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                textAlign: 'center',
                minWidth: 100,
                alignSelf: 'center'
              }}>
              No Image
            </div>
          )}

          <div style={{ alignSelf: 'center' }}>
            <div style={{ fontWeight: 'bold' }}>
              {pokemon?.id} | {pokemon?.name}
            </div>
            <div style={{ fontStyle: 'italic', fontSize: 13, marginTop: 2 }}>
              {pokemon?.species.url && <Species url={pokemon.species.url}></Species>}
            </div>
          </div>
        </div>
      )}
      {isFetching && (
        <div
          style={{
            ...CardStyle,
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 100,
            fontStyle: 'italic',
            fontSize: 12
          }}>
          Loading...
        </div>
      )}
    </>
  );
};

export default React.memo(Pokemon);
