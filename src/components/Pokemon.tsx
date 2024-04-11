import React, { CSSProperties } from "react";
import Species from "./Species";
import { useGetPokemonQuery } from "../store/api/apiSlice";
import PokemonImage from "./PokemonImage";
import Loading from "./Loading";

const CardStyle: CSSProperties = {
  padding: 5,
  border: "1px solid",
  margin: 5,
  display: "flex",
  boxSizing: "border-box",
  flexBasis: 250,
  flexGrow: 1,
  columnGap: 5,
  minHeight: 100,
};

const Pokemon = ({ id }: { id: string }) => {
  const { data: pokemon, isFetching } = useGetPokemonQuery({ id });

  return (
    <>
      {
        <div style={CardStyle}>
          <PokemonImage
            front_default={
              pokemon?.sprites.other["official-artwork"].front_default
            }
          />

          <div style={{ alignSelf: "center", textAlign: "left"}}>
            {!isFetching && (
              <div style={{ fontWeight: "bold" }}>
                {pokemon?.id} | {pokemon?.name}
              </div>
            )}
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

export default React.memo(Pokemon);
