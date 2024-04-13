import { Pokemon } from "../types/Pokemon";

const PokemonName = ({ pokemon }: { pokemon: Pokemon | undefined }) => {
  return (
    <div style={{ fontWeight: "bold" }}>
      {pokemon?.name} ({`#${pokemon?.id}`})
    </div>
  );
};

export default PokemonName;
