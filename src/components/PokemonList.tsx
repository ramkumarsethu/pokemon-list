import { useEffect, useState } from 'react';
import { Pokemon as PokemonType } from '../types/Pokemon';
import Pokemon from './Pokemon';
import { useGetPokemonListQuery } from '../store/api/apiSlice';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState<Array<PokemonType>>([]);
  const [loadMoreData, setLoadMoreData] = useState(true);
  const [pokemonUrl, setPokemonUrl] = useState(
    'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'
  );
  const { data } = useGetPokemonListQuery({ url: pokemonUrl }, { skip: !loadMoreData });

  const handleInfiniteScroll = () => {
    const { clientHeight, scrollTop, scrollHeight } = document.documentElement;
    setLoadMoreData(!!(pokemonUrl && scrollTop + clientHeight + 100 >= scrollHeight));
  };

  useEffect(() => {
    if (data) {
      setPokemonList([...pokemonList, ...data.results]);
      setPokemonUrl(data.next);
      setLoadMoreData(false);
    }
  }, [data]);

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  }, []);

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {pokemonList.map((pokemon) => (
          <Pokemon url={pokemon.url} key={pokemon.name}></Pokemon>
        ))}
      </div>
      {pokemonUrl && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
          <a onClick={() => setLoadMoreData(true)} style={{ color: 'blue', cursor: 'pointer' }}>
            Load more...
          </a>
        </div>
      )}
    </>
  );
};

export default PokemonList;
