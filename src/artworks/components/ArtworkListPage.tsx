import React from "react";
import { useSearchParams } from "react-router-dom";
import { CircularProgress, TextField } from "@mui/material";

import { useArtworkListQuery } from "./queries";
import Artwork from "./Artwork";
import ArtworkList from "./ArtworkList";

export default function ArtworkListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchText = searchParams.get("q") || "";
  const offsetParam = searchParams.get("offset");
  const offset = offsetParam ? parseInt(offsetParam) : 0;
  const limit = 9;

  const artworkListQuery = useArtworkListQuery({ searchText, offset, limit });

  const { data: artworks } = artworkListQuery;
//   if (artworkListQuery.isLoading) {
//     console.log("Test");
//     return <p>Loading...</p>;
//   }

//   console.log("Test2");

//   if (artworkListQuery.isError) {
//     return <p>Error: {artworkListQuery.isError}</p>;
//   }
  const filteredArtworks = artworks?.results ? artworks : { results: [] };
  return (
    <div>
      <h1>Artworks {artworkListQuery.isFetching && <CircularProgress />}</h1>
      <TextField
        name="q"
        placeholder="Search Artworks..."
        value={searchText}
        style={{
          width: "100%",
          marginBottom: 10,
        }}
        onChange={(e) => setSearchParams({ searchText: e.target.value })}
      />
      {artworks ? (
        <nav>
          <button
            disabled={!artworks.previousOffset}
            onClick={() =>
              setSearchParams((prev) => ({
                ...prev,
                offset: artworks.previousOffset,
              }))
            }
          >
            Previous
          </button>
          <button
            disabled={!artworks.nextOffset}
            onClick={() =>
              setSearchParams((prev) => ({
                ...prev,
                offset: artworks.nextOffset,
              }))
            }
          >
            Next
          </button>
        </nav>
      ) : (
        <div></div>
      )}
      <ArtworkList>
        {filteredArtworks.results.map((artwork) => (
          <Artwork key={artwork.objectID} artwork={artwork} />
        ))}
      </ArtworkList>
    </div>
  );
}
