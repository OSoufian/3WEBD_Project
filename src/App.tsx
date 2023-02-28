import "./App.css";
import styles from "./App.module.css";

import ArtworkDetails from "./artworks/components/ArtworkDetails";

import { useArtworkListQuery } from "./artworks/components/queries";

import ArtworkList from "./artworks/components/ArtworkList";
import Artwork from "./artworks/components/Artwork";

import { ArtworkType } from "./types";

function App() {
  const artworkList = useArtworkListQuery();
  return (
    <div>
      <h1>Artworks</h1>

      <div>
        {/* <ArtworkList>
          {artworkList.results.map((artwork) => (
            <Artwork key={artwork.id} artwork={artwork} />
          ))}{" "}
        </ArtworkList> */}
      </div>
    </div>
  );
}

export default App;