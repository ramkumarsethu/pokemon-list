import { useState } from 'react';
import { Pokemon } from '../types/Pokemon';
import Loading from './Loading';

const PokemonImage = ({ front_default }: Pokemon['sprites']['other']['official-artwork']) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <>
      {front_default && (
        <img
          src={front_default}
          style={{
            display: imageLoaded ? 'block' : 'none',
            height: 100,
            width: 100,
            alignSelf: 'center'
          }}
          onLoad={() => setImageLoaded(true)}
        />
      )}
      {front_default && !imageLoaded && (
        <Loading style={{ minWidth: 100, maxWidth: 100, minHeight: 100 }} />
      )}
      {!front_default && (
        <div
          style={{
            fontWeight: 'bold',
            fontSize: 14,
            textAlign: 'center',
            minWidth: 100,
            alignSelf: 'center'
          }}>
          No Image
        </div>
      )}
    </>
  );
};

export default PokemonImage;
