import "./App.css";

import ArtworkDetails from "./artworks/components/ArtworkDetails";

import { useArtworkListQuery } from "./artworks/components/queries";

import { ArtworkList } from "./artworks/components/ArtworkList";

function App() {
  return (
    <div>
      <ArtworkList />
    </div>
  );
}

export default App;
