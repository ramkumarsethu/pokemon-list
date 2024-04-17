import { useEffect, useState, useTransition } from "react";
import { Pokemon as PokemonType } from "../types/Pokemon";
import { useGetPokemonListQuery } from "../store/api/apiSlice";
import { Spinner } from "react-bootstrap";

/**
 * additional height that is added to scroll position check when comparing the scrollHeight to determine when to eager fetch the next batch of pokemons
 */
const SCROLL_POSITION_APPENDER = 500;

const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";

type PokemonListProps = {
  /** This is a render prop function that renders Large Card or Small Card based on the Card Type selected in the Parent Container */
  render: (pokemonList: PokemonType[]) => JSX.Element;
};

/**
 * This Functional component renders a list of Pokemon cards and has a render prop to render larger cards or smaller cards depending on the card type selected in the parent component
 * @returns JSX.Element
 */
const PokemonList = ({ render }: PokemonListProps) => {
  const [pokemonList, setPokemonList] = useState<Array<PokemonType>>([]);
  const [loadMoreData, setLoadMoreData] = useState(true);
  const [pokemonUrl, setPokemonUrl] = useState(POKEMON_URL);
  const { data, isError, isFetching } = useGetPokemonListQuery(
    { url: pokemonUrl },
    { skip: !loadMoreData || !pokemonUrl },
  );
  const [_, startTransition] = useTransition();

  const handleInfiniteScroll = () => {
    const { clientHeight, scrollTop, scrollHeight } = document.documentElement;
    startTransition(() => {
      setLoadMoreData(
        !!(
          pokemonUrl &&
          scrollTop + clientHeight + SCROLL_POSITION_APPENDER >= scrollHeight
        ),
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
      <div style={{ display: "flex", flexWrap: "wrap", padding: "0px 10px" }}>
        {render(pokemonList)}
      </div>
      {/* loading spinner for initial display */}
      {pokemonList.length === 0 && isFetching && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spinner
            animation="border"
            variant="info"
            style={{ height: 100, width: 100 }}
          />
        </div>
      )}
      {/* This load more option is really useful for the initial data set and is manually required to click to get the next set of data when the initial load of data is rendered well within the viewport without much scroll movement on larger screens */}
      {pokemonUrl && !isFetching && !isError && (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 40 }}
        >
          <a
            onClick={() => setLoadMoreData(true)}
            style={{ color: "#ffffff", cursor: "pointer" }}
          >
            Load more...
          </a>
        </div>
      )}
    </>
  );
};

export default PokemonList;
