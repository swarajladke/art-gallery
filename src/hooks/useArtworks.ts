
import { useState, useEffect } from 'react';
import { fetchArtworks } from '../services/api';
import type { Artwork, Pagination } from '../types/artwork';

interface UseArtworksResult {
    artworks: Artwork[];
    pagination: Pagination | null;
    loading: boolean;
    error: string | null;
}

export const useArtworks = (page: number): UseArtworksResult => {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadArtworks = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetchArtworks(page);
                setArtworks(response.data);
                setPagination(response.pagination);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch artworks');
            } finally {
                setLoading(false);
            }
        };

        loadArtworks();
    }, [page]);

    return { artworks, pagination, loading, error };
};
