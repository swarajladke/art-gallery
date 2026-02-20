
import type { APIResponse } from '../types/artwork';

const BASE_URL = 'https://api.artic.edu/api/v1/artworks';

export const fetchArtworks = async (page: number): Promise<APIResponse> => {
    try {
        const response = await fetch(`${BASE_URL}?page=${page}&limit=12`);
        if (!response.ok) {
            throw new Error(`Error fetching artworks: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch artworks", error);
        throw error;
    }
};
