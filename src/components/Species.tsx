import React from 'react';
import { PokemonProps } from '../types/Pokemon';
import { useGetSpeciesQuery } from '../store/api/apiSlice';

const Species = ({ url }: PokemonProps) => {
  const { data, isFetching } = useGetSpeciesQuery({ url });
  return (
    <>
      {!isFetching && <div>{data?.flavor_text_entries?.[0]?.flavor_text || ''}</div>}
      {isFetching && (
        <div style={{ fontStyle: 'italic', fontSize: 12 }}>Loading Description...</div>
      )}
    </>
  );
};

export default React.memo(Species);
