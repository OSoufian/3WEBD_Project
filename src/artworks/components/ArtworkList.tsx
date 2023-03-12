import styles from "./ArtworkList.module.css";
import { useArtworkHighlightListQuery } from "../queries";

import Artwork from "./Artwork";

import { ChangeEvent, useState } from "react";
import { TextField, Checkbox } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

export default function ArtworkList() {
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchOptions, setSearchOptions] = useState({
    hasImages: false,
    isOnView: false,
    artistOrCulture: "",
    geoLocation: "",
    dimensions: "",
  });
  const { artworksHighlight, isLoading } = useArtworkHighlightListQuery({
    isOnView: searchOptions.isOnView,
  });

  const filteredArtworkList = artworksHighlight.filter((artwork) => {
    if (input === "") {
      return true;
    } else {
      return artwork.title.toLowerCase().includes(input.toLowerCase());
    }
  });

  const itemsPerPage = 6;

  const totalPages = Math.ceil(filteredArtworkList.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(
      <button key={i} onClick={() => setCurrentPage(i)}>
        {i}
      </button>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedArtworkList = filteredArtworkList.slice(startIndex, endIndex);

  return (
    <div>
      <TextField
        className={styles["search-input"]}
        placeholder="Rechercher"
        onChange={(event) => setInput(event.target.value)}
      />
      {/* <div>
        <Checkbox
          checked={searchOptions.hasImages}
          name="hasImages"
        />
        Contient une image
      </div> */}
      <div>
        <Checkbox
          checked={searchOptions.isOnView}
          name="isOnView"
          onChange={(event) =>
            setSearchOptions((prevOptions) => ({
              ...prevOptions,
              isOnView: event.target.checked,
            }))
          }
        />
        En exposition
      </div>
      {isLoading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <div className={styles["museum-list"]}>
          {displayedArtworkList.map((artwork) => (
            <Artwork artwork={artwork} key={artwork.objectID} />
          ))}
        </div>
      )}
      <div className={styles.pagination}>{pageNumbers}</div>
    </div>
  );
}