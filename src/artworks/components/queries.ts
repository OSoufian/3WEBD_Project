import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { ArtworkType } from "../../types";

const baseUrl = 'https://collectionapi.metmuseum.org'

export function useArtworkListQuery({searchArtwork = "", }: { searchArtwork?: string} = {}) {

    return useQuery(['Artworks', {searchArtwork}], async () => {
        const response = await fetch(`${baseUrl}/public/collection/v1/objects?limit=100&searchText=${searchArtwork}`)
        const json = await response.json();

        return json as {
            results: ArtworkType[];
        }
    })
}

export function useArtworkDetailsQuery(ArtworkId: number | null) {
    return useQuery(['Artworks'], async () => {
        const response = await fetch(`${baseUrl}/Artworks/${ArtworkId}`);
        const json = await response.json();

        return json as ArtworkType;
    })
}