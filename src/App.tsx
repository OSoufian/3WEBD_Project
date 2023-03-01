import "./App.css";
import styles from "./App.module.css";

import ArtworkList from "./artworks/components/ArtworkList";

function App() {
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
