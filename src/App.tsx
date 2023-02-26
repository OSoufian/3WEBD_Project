import './App.css';


import ArtworkDetails from './artworks/components/ArtworkDetails'
import ArtworkListContainer from './artworks/components/ArtworkListContainer'

function App() {
  return (
    <div>
        <ArtworkDetails objectID={1000} />
        <p>Test</p>
        <ArtworkListContainer />
    </div>
  );
}

export default App;