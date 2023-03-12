import styles from "./ArtworkList.module.css";
import { useArtworkHighlightListQuery } from "../queries";

import Artwork from "./Artwork";

import { ChangeEvent, useState } from "react";
import { TextField, Checkbox, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import CircularProgress from '@mui/material/CircularProgress';

export default function ArtworkList() {
  const [showSearchOptions, setShowSearchOptions] = useState(false);
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchOptions, setSearchOptions] = useState({
    isHighlight: false,
    hasImages: false,
    isOnView: false,
    artistOrCulture: "",
    geoLocation: "",
    dateBegin: "",
    dateEnd: "",
  });
  const { artworksHighlight, isLoading } = useArtworkHighlightListQuery({
    isOnView: searchOptions.isOnView,
    hasImages: searchOptions.hasImages,
    artistOrCulture: searchOptions.artistOrCulture,
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
      <Button onClick={() => setShowSearchOptions(!showSearchOptions)}>Recherche avancée</Button>     
      <div style={{ display: showSearchOptions ? "block" : "none" }}>
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
        <div>
        <TextField
          label="Artiste ou culture"
          value={searchOptions.artistOrCulture}
          name="artistOrCulture"
          onChange={(event) =>
            setSearchOptions((prevOptions) => ({
              ...prevOptions,
              artistOrCulture: event.target.value,
            }))
          }
        />
        </div>
        <div>
        {/* <TextField
          label="Date de début"
          value={searchOptions.beginDate}
          name="beginDate"
          onChange={(event) =>
            setSearchOptions((prevOptions) => ({
              ...prevOptions,
              beginDate: event.target.value,
            }))
          }
        /> */}
        </div>
        <div>
        {/* <TextField
          label="Date de fin"
          value={searchOptions.endDate}
          name="endDate"
          onChange={(event) =>
            setSearchOptions((prevOptions) => ({
              ...prevOptions,
              endDate: event.target.value,
            }))
          }
        /> */}
        </div>
        <div>
        {/* <FormControl>
        <InputLabel>Localisation</InputLabel>
        <Select
          value={searchOptions.geoLocation}
          onChange={(event) =>
            setSearchOptions((prevOptions) => ({
              ...prevOptions,
              geoLocation: event.target.value,
            }))}
        >
          <MenuItem value="">
            <em>Aucun</em>
          </MenuItem>
          <MenuItem value="Europe">Europe</MenuItem>
          <MenuItem value="France">France</MenuItem>
          <MenuItem value="Paris">Paris</MenuItem>
          <MenuItem value="China">China</MenuItem>
          <MenuItem value="New York">New York</MenuItem>
        </Select>
      </FormControl> */}

        </div>
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