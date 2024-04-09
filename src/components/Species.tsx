import React from 'react';
import { PokemonProps } from '../types/Pokemon';
import { useGetSpeciesQuery } from '../store/api/apiSlice';
import Loading from './Loading';

const Species = ({ url }: PokemonProps) => {
  const { data, isFetching } = useGetSpeciesQuery({ url });
  return (
    <>
      {!isFetching && <div>{data?.flavor_text_entries?.[0]?.flavor_text || ''}</div>}
      {isFetching && <Loading style={{ minHeight: 5, minWidth: 100, marginTop: 3 }} />}
    </>
  );
};

export default React.memo(Species);
