import React, { useCallback, useState } from "react";
import PokemonLarge from "./PokemonLarge";
import Pokemon from "./Pokemon";
import { Form } from "react-bootstrap";
import { CardType } from "../types/Pokemon";
import PokemonList from "./PokemonList";

const PokemonContainer = () => {
  const [cardType, setCardType] = useState<CardType>(CardType.LARGE_CARDS);
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
          justifyContent: "end",
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
      {CardType.LARGE_CARDS === cardType && (
        <PokemonList
          render={(pokemonList) => (
            <>
              {pokemonList.map((pokemon) => (
                <PokemonLarge id={pokemon.name} key={pokemon.name} />
              ))}
            </>
          )}
        />
      )}
      {CardType.SMALL_CARDS === cardType && (
        <PokemonList
          render={(pokemonList) => (
            <>
              {pokemonList.map((pokemon) => (
                <Pokemon id={pokemon.name} key={pokemon.name} />
              ))}
            </>
          )}
        />
      )}
    </div>
  );
};

export default React.memo(PokemonContainer);
