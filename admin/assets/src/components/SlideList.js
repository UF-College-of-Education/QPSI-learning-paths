/**
 * SlideList
 *
 * Renders the ordered list of slides in the learning path sequence.
 *
 * @since 1.0.0
 * @package Learning_Paths
 * 
 */

import SlideItem from './SlideItem';

/**
 * @param {string}      sequence        JSON containing order of slides
 * @param {string}      activeSlideId   
 * @param {function}    onSelectSlide
 * @param {function}    onReorder
 * @param {function}    onRemoveSlide
 */

export default function SlideList( { 
    sequence, 
    activeSlideId, 
    onSelectSlide, 
    onReorder, 
    onRemoveSlide 
} ) {

    if ( ! sequence.length ) {
        return (
            <p className="lp-slide-list__empty">
                { 'No slides added yet. Click "Add Slide" to get started.' }
            </p>
        );
    }

    /**
     * Move a slide up or down in the sequence.
     *
     * @param {number} index     Current index of the slide.
     * @param {string} direction 'up' or 'down'.
     */
    const handleMove = ( index, direction ) => {
        const newSequence = [ ...sequence ];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if ( targetIndex < 0 || targetIndex >= newSequence.length ) {
            return;
        }

        [ newSequence[ index ], newSequence[ targetIndex ] ] = [ newSequence[ targetIndex ], newSequence[ index ] ];
        onReorder( newSequence );
    };

    return (
        <ul className="lp-slide-list">
            { sequence.map( ( slide, index ) => (
                <SlideItem
                    key={ slide.clientId }
                    slide={ slide }
                    index={ index }
                    isActive={ slide.clientId === activeSlideId }
                    isFirst={ index === 0 }
                    isLast={ index === sequence.length - 1 }
                    onSelect={ () => onSelectSlide( slide.clientId ) }
                    onMoveUp={ () => handleMove( index, 'up' ) }
                    onMoveDown={ () => handleMove( index, 'down' ) }
                    onRemove={ () => onRemoveSlide( slide.clientId ) }
                />
            ) ) }
        </ul>
    );

}