import React, { useEffect, useState } from 'react';
import { Pokemon } from '../types/Pokemon';

const Species = ({ url }: Pick<Pokemon['species'], 'url'>) => {
  const [flavorText, setFlavorText] = useState<string>();

  useEffect(() => {
    const fetchSpecies = async () => {
      const data = await fetch(url);
      const result: Pick<Pokemon, 'flavor_text_entries'> = await data.json();
      setFlavorText(result.flavor_text_entries[0].flavor_text);
    };
    fetchSpecies();
  }, []);
  return <div>{flavorText}</div>;
};

export default React.memo(Species);
