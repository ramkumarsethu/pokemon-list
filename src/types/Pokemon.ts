export type Pokemon = {
  name: string;
  url: string;
  sprites: {
    other: {
      ['official-artwork']: {
        front_default: string;
      };
    };
  };
  id: number;
  species: {
    name: string;
    url: string;
  };
  flavor_text_entries?: Array<{ flavor_text: string }>;
};

export type PokemonListResult = {
  results: Array<Pokemon>;
  next: string;
};

export type PokemonProps = Pick<Pokemon, 'url'>;
