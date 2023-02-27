import "./App.css";

import ArtworkDetails from "./artworks/components/ArtworkDetails";

import { useArtworkListQuery } from "./artworks/components/queries";
import "./ArtworkListContainer.module.css";

import { ArtworkList } from "./artworks/components/ArtworkList";

function App() {
  return (
    <div>
      <ArtworkList Artworks={artworkList} />
    </div>
  );
}

export default App;
