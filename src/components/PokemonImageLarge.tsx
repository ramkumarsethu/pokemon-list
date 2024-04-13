import { CSSProperties, useState } from "react";
import { Pokemon } from "../types/Pokemon";
import Loading from "./Loading";

const imageCSS: CSSProperties = {
  height: 200,
};

const PokemonImageLarge = ({
  front_default,
}: Pokemon["sprites"]["other"]["official-artwork"]) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <>
      {front_default && (
        <img
          src={front_default}
          style={{
            ...imageCSS,
            display: imageLoaded ? "block" : "none",
            alignSelf: "center",
          }}
          onLoad={() => setImageLoaded(true)}
        />
      )}
      {front_default && !imageLoaded && <Loading style={{ ...imageCSS }} />}
      {!front_default && (
        <div
          style={{
            ...imageCSS,
            fontWeight: "bold",
            fontSize: 14,
            textAlign: "center",
            minWidth: 100,
            alignContent: "center",
            alignSelf: "center",
          }}
        >
          No Image
        </div>
      )}
    </>
  );
};

export default PokemonImageLarge;
