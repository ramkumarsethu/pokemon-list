import React from "react";
import { useGetSpeciesQuery } from "../store/api/apiSlice";
import Loading from "./Loading";

const Species = ({ id }: { id: string }) => {
  const { data, isFetching } = useGetSpeciesQuery({ id });
  return (
    <>
      {!isFetching && (
        <div>{data?.flavor_text_entries?.[0]?.flavor_text || ""}</div>
      )}
      {isFetching && (
        <>
          {[...Array(4).keys()].map((e) => (
            <Loading key={e} style={{ marginTop: 5 }} />
          ))}
        </>
      )}
    </>
  );
};

export default React.memo(Species);
