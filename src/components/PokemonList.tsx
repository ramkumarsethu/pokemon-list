import {
  Fragment,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { Pokemon as PokemonType } from "../types/Pokemon";
import { useGetPokemonListQuery } from "../store/api/apiSlice";
import PokemonLarge from "./PokemonLarge";
import Pokemon from "./Pokemon";
import { Form } from "react-bootstrap";

enum CardType {
  LARGE_CARDS = "Large cards",
  SMALL_CARDS = "Small cards",
}

/**
 * additional height that is added to scroll position check when comparing the scrollHeight to determine when to eager fetch the next batch of pokemons
 */
const scrollPositionAppender = 500;

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
  const [cardType, setCardType] = useState<CardType>(CardType.LARGE_CARDS);

  const handleInfiniteScroll = () => {
    const { clientHeight, scrollTop, scrollHeight } = document.documentElement;
    startTransition(() => {
      setLoadMoreData(
        !!(
          pokemonUrl &&
          scrollTop + clientHeight + scrollPositionAppender >= scrollHeight
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

  const toggleCardType = useCallback((cardType: CardType) => {
    setCardType(cardType);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Form
        style={{
          display: "flex",
          columnGap: 10,
          color: "white",
          paddingTop: 10,
          paddingLeft: 15,
          paddingRight: 15,
          fontSize: 14,
          position: "sticky",
          top: 0,
          backgroundColor: "#4873bb",
        }}
      >
        {Object.values(CardType).map((e) => (
          <Form.Check
            key={e}
            type="radio"
            name="card-type"
            label={e}
            value={e}
            defaultChecked={cardType === e}
            onClick={(event) =>
              toggleCardType(event.currentTarget.value as CardType)
            }
          />
        ))}
      </Form>
      <div style={{ display: "flex", flexWrap: "wrap", padding: "0px 10px" }}>
        {pokemonList.map((pokemon) => (
          <Fragment key={pokemon.name}>
            {CardType.LARGE_CARDS === cardType && (
              <PokemonLarge id={pokemon.name} key={pokemon.name} />
            )}
            {CardType.SMALL_CARDS === cardType && (
              <Pokemon id={pokemon.name} key={pokemon.name} />
            )}
          </Fragment>
        ))}
      </div>
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
    </div>
  );
};

export default PokemonList;
