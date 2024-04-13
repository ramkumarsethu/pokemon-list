import React, { CSSProperties } from "react";
import Species from "./Species";
import { useGetPokemonQuery } from "../store/api/apiSlice";
import Loading from "./Loading";
import PokemonImageLarge from "./PokemonImageLarge";
import PokemonName from "./PokemonName";

const CardStyle: CSSProperties = {
  padding: 10,
  border: "1px solid #ffffff",
  borderRadius: 10,
  margin: 3,
  display: "flex",
  boxSizing: "border-box",
  flexBasis: 300,
  flexGrow: 1,
  columnGap: 5,
  backgroundColor: "#ffffff",
  flexDirection: "column",
};

const PokemonNewLarge = ({ id }: { id: string }) => {
  const { data: pokemon, isFetching } = useGetPokemonQuery({ id });

  return (
    <>
      {
        <div style={CardStyle}>
          <PokemonImageLarge
            front_default={
              pokemon?.sprites.other["official-artwork"].front_default
            }
          />
          <div
            style={{
              alignSelf: "center",
              overflowWrap: "anywhere",
              width: "100%",
              marginTop: 2,
            }}
          >
            {!isFetching && <PokemonName pokemon={pokemon} />}
            {isFetching && (
              <>
                {[...Array(5).keys()].map((e) => (
                  <Loading key={e} style={{ marginTop: 5 }} />
                ))}
              </>
            )}
            <div style={{ fontStyle: "italic", fontSize: 13, marginTop: 2 }}>
              {pokemon?.species.url && (
                <Species id={pokemon.species.name}></Species>
              )}
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default React.memo(PokemonNewLarge);
