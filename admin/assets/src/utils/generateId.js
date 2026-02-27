/**
 * Generate a unique client-side ID for slide items.
 * These are used for React keys and panel tracking only
 * and are not persisted to the database.
 *
 * @returns {string}
 */
export const generateId = () => {
    return `slide-${ Date.now() }-${ Math.random().toString( 36 ).substr( 2, 9 ) }`;
};