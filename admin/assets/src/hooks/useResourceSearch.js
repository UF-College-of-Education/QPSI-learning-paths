/**
 * useResourceSearch
 *
 * Custom hook for fetching, searching, and paginating
 * internal_resource posts for the Existing Resource slide form.
 *
 * @since 1.0.0
 * @package Learning_Paths
 */

import { useState, useEffect, useRef } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

const PER_PAGE = 10;

export default function useResourceSearch() {

    const [ query, setQuery ]         = useState( '' );
    const [ results, setResults ]     = useState( [] );
    const [ page, setPage ]           = useState( 1 );
    const [ totalPages, setTotalPages ] = useState( 1 );
    const [ isLoading, setIsLoading ] = useState( false );
    const [ error, setError ]         = useState( null );
    const debounceTimer               = useRef( null );

    /**
     * Fetch posts from the REST API based on the current query and page.
     *
     * @param {string} searchQuery
     * @param {number} currentPage
     */
    async function fetchResources( searchQuery, currentPage ) {
        setIsLoading( true );
        setError( null );

        try {
            const params = new URLSearchParams( {
                per_page: PER_PAGE,
                page:     currentPage,
                _fields:  'id,title,,link',
                orderby:  'date',
                order:    'desc',
            } );

            if ( searchQuery ) {
                params.set( 'search', searchQuery );
            }

            const response = await apiFetch( {
                path: `/wp/v2/internal_resource?${ params.toString() }`,
                parse: false,
            } );

            const total = parseInt( response.headers.get( 'X-WP-TotalPages' ), 10 );
            const data  = await response.json();

            setResults( data );
            setTotalPages( total || 1 );
        } catch ( err ) {
            setError( 'Failed to load resources. Please try again.' );
            setResults( [] );
        } finally {
            setIsLoading( false );
        }
    }

    /**
     * When the query changes, debounce the fetch and reset to page 1.
     */
    useEffect( () => {
        if ( debounceTimer.current ) {
            clearTimeout( debounceTimer.current );
        }

        debounceTimer.current = setTimeout( () => {
            setPage( 1 );
            fetchResources( query, 1 );
        }, 300 );

        return () => {
            if ( debounceTimer.current ) {
                clearTimeout( debounceTimer.current );
            }
        };
    }, [ query ] );

    /**
     * When the page changes, fetch without resetting.
     * Skip on initial render since the query effect handles that.
     */
    const isFirstRender = useRef( true );

    useEffect( () => {
        if ( isFirstRender.current ) {
            isFirstRender.current = false;
            return;
        }
        fetchResources( query, page );
    }, [ page ] );

    return {
        query,
        setQuery,
        results,
        page,
        setPage,
        totalPages,
        isLoading,
        error,
    };

}