import React from 'react';
import { PokemonProps } from '../types/Pokemon';
import { useGetSpeciesQuery } from '../store/api/apiSlice';
import Loading from './Loading';

const Species = ({ id }: { id: string }) => {
  const { data, isFetching } = useGetSpeciesQuery({ id });
  return (
    <>
      {!isFetching && <div>{data?.flavor_text_entries?.[0]?.flavor_text || ''}</div>}
      {isFetching && <Loading />}
    </>
  );
};

export default React.memo(Species);
