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
    <div className={styles["main-container"]}>
      <h1>Artworks</h1>
      <div>
        <ArtworkList/>
      </div>
    </div>
  );
}

export default App;
