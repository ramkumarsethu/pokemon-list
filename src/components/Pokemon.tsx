import React, { useEffect, useState } from 'react';
import { Pokemon } from '../types/Pokemon';
import Species from './Species';

type PokemonProps = {
  url: string;
};

const Pokemon = ({ url }: PokemonProps) => {
  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await fetch(url);
      const result: Pokemon = await data.json();
      setPokemon(result);
    };
    fetchPokemon();
  }, []);

  return (
    <div
      style={{
        padding: 5,
        border: '1px solid',
        margin: 5,
        display: 'flex',
        boxSizing: 'border-box',
        flexBasis: 250,
        flexGrow: 1,
        columnGap: 5
      }}>
      <img
        src={pokemon?.sprites.other['official-artwork'].front_default}
        style={{ height: 100, width: 100, alignSelf: 'center' }}></img>
      <div style={{ alignSelf: 'center' }}>
        <div style={{ fontWeight: 'bold' }}>
          {pokemon?.id} | {pokemon?.name}
        </div>
        <div style={{ fontStyle: 'italic', fontSize: 13, marginTop: 2 }}>
          {pokemon?.species.url && <Species url={pokemon.species.url}></Species>}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Pokemon);
