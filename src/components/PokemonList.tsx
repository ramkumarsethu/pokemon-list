import { useEffect, useState, useTransition } from "react";
import { Pokemon as PokemonType } from "../types/Pokemon";
import Pokemon from "./Pokemon";
import { useGetPokemonListQuery } from "../store/api/apiSlice";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState<Array<PokemonType>>([]);
  const [loadMoreData, setLoadMoreData] = useState(true);
  const [pokemonUrl, setPokemonUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
  );
  const { data, isError, isFetching } = useGetPokemonListQuery(
    { url: pokemonUrl },
    { skip: !loadMoreData || !pokemonUrl },
  );
  const [_, startTransition] = useTransition();

  const handleInfiniteScroll = () => {
    const { clientHeight, scrollTop, scrollHeight } = document.documentElement;
    startTransition(() => {
      setLoadMoreData(
        !!(pokemonUrl && scrollTop + clientHeight + 200 >= scrollHeight),
      );
    });
  };

  useEffect(() => {
    if (data) {
      setPokemonList([...pokemonList, ...data.results]);
      setPokemonUrl(data.next);
      setLoadMoreData(false);
    }
  }, [data]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", padding: 20 }}>
        {pokemonList.map((pokemon) => (
          <Pokemon id={pokemon.name} key={pokemon.name}></Pokemon>
        ))}
      </div>
      {/* This load more option is really useful for the initial data set and is manually required to click to get the next set of data when the initial load of data is rendered well within the viewport without much scroll movement on larger screens */}
      {pokemonUrl && !isFetching && !isError && (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 40 }}
        >
          <a
            onClick={() => setLoadMoreData(true)}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Load more...
          </a>
        </div>
      )}
    </>
  );
};

export default PokemonList;
