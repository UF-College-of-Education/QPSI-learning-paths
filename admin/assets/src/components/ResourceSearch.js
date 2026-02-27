/**
 * ResourceSearch
 *
 * Handles searching, displaying, and paginating internal_resource
 * posts for selection within the SlideForm.
 *
 * @since 1.0.0
 * @package Learning_Paths
 */

import { Spinner } from '@wordpress/components';
import useResourceSearch from '../hooks/useResourceSearch';

export default function ResourceSearch( { selectedPost, onSelect } ) {

    const {
        query,
        setQuery,
        results,
        page,
        setPage,
        totalPages,
        isLoading,
        error,
    } = useResourceSearch();

    /**
     * Get the plain text title from a post object.
     * The REST API returns title as an object with a rendered property.
     *
     * @param {Object} post
     * @returns {string}
     */
    function getTitle( post ) {
        return post.title?.rendered || 'Untitled';
    }

    return (
        <div className="lp-resource-search">
            <p className="lp-resource-search__selected">
                <strong>{ 'Currently Selected Resource: ' }</strong>
                { selectedPost ? getTitle( selectedPost ) : 'None selected' }
            </p>
            <div className="lp-resource-search__field">
                <label className="lp-resource-search__label" htmlFor="resource-search">
                    { 'Search Resources' }
                </label>
                <input
                    type="search"
                    className="lp-resource-search__input"
                    name="resource-search"
                    value={ query }
                    onChange={ ( e ) => setQuery( e.target.value ) }
                    placeholder="Search by title..."
                />
            </div>

            <div className="lp-resource-search__results">
                { isLoading && (
                    <div className="lp-resource-search__loading">
                        <Spinner />
                    </div>
                ) }

                { ! isLoading && error && (
                    <p className="lp-resource-search__error">{ error }</p>
                ) }

                { ! isLoading && ! error && results.length === 0 && (
                    <p className="lp-resource-search__empty">
                        { query ? 'No resources found.' : 'No resources available.' }
                    </p>
                ) }

                { ! isLoading && ! error && results.length > 0 && (
                    <ul className="lp-resource-search__list">
                        { results.map( ( post ) => (
                            <li
                                key={ post.id }
                                className={ `lp-resource-search__item${ selectedPost?.id === post.id ? ' lp-resource-search__item--selected' : '' }` }
                                onClick={ () => onSelect( post ) }
                            >
                                <span className="lp-resource-search__item-title">
                                    { getTitle( post ) }
                                </span>
                                <a
                                    href={ post.link }
                                    target="_blank"
                                    rel="noreferrer"
                                    className="lp-resource-search__item-view"
                                    onClick={ ( e ) => e.stopPropagation() }
                                >
                                    { '(View)' }
                                </a>
                            </li>
                        ) ) }
                    </ul>
                ) }
            </div>

            { ! isLoading && totalPages > 1 && (
                <div className="lp-resource-search__pagination">
                    <button
                        className="lp-resource-search__pagination-btn"
                        onClick={ () => setPage( ( p ) => p - 1 ) }
                        disabled={ page === 1 }
                    >
                        { '← Previous' }
                    </button>
                    <span className="lp-resource-search__pagination-info">
                        { `Page ${ page } of ${ totalPages }` }
                    </span>
                    <button
                        className="lp-resource-search__pagination-btn"
                        onClick={ () => setPage( ( p ) => p + 1 ) }
                        disabled={ page === totalPages }
                    >
                        { 'Next →' }
                    </button>
                </div>
            ) }
        </div>
    );

}