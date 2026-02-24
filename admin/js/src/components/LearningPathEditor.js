/**
 * LearningPathEditor
 *
 * Top level component for the learning path editor.
 * Owns the sequence state and syncs it to a hidden input
 * for saving via the WordPress post save mechanism.
 *
 * @since 1.0.0
 * @package Learning_Paths
 */

import { useState, useEffect, useRef } from '@wordpress/element';
import { generateId } from '../utils/generateId';
import SlideList from './SlideList';
import AddSlideButton from './AddSlideButton';
import SlidePanel from './SlidePanel';

export default function LearningPathEditor() {

    /**
     * Read the initial sequence from the localized script data set by PHP.
     * Falls back to an empty array if nothing is saved yet.
     */
    const savedSequence = window.learningPathsData?.sequence || [];

    /**
     * Hydrate saved sequence with client-side IDs.
     * Saved slides won't have a clientId so we add one on load.
     */
    function hydrateSequence( sequence ) {
        return sequence.map( ( slide ) => ({
            ...slide,
            clientId: generateId(),
        }) );
    }

    const [ sequence, setSequence ]           = useState( () => hydrateSequence( savedSequence ) );
    const [ activeSlideId, setActiveSlideId ] = useState( null );
    const hiddenInputRef                      = useRef( null );

    /**
     * Sync sequence state to hidden input whenever it changes
     * so WordPress saves the latest value on post save.
     * Client IDs are stripped before saving.
     */
    useEffect( () => {
        if ( hiddenInputRef.current ) {
            const toSave = sequence.map( ( { clientId, ...rest } ) => rest );
            hiddenInputRef.current.value = JSON.stringify( toSave );
        }
    }, [ sequence ] );

    /**
     * Add a new empty slide to the sequence and open the panel.
     */
    const handleAddSlide = () => {
        const newSlide = {
            clientId: generateId(),
            id:       null,
            type:     null,
            template: null,
        };
        setSequence( ( prev ) => [ ...prev, newSlide ] );
        setActiveSlideId( newSlide.clientId );
    };

    /**
     * Remove a slide from the sequence by its clientId.
     *
     * @param {string} clientId
     */
    const handleRemoveSlide = ( clientId ) => {
        setSequence( ( prev ) => prev.filter( ( slide ) => slide.clientId !== clientId ) );
        if ( activeSlideId === clientId ) {
            setActiveSlideId( null );
        }
    };

    /**
     * Confirm a slide update and close the panel atomically.
     * This avoids a race condition where handleClosePanel reads
     * stale state and removes a slide that was just confirmed.
     *
     * @param {Object} updates
     */
    const handleConfirmSlide = ( updates, shouldClose = true ) => {
        setSequence( ( prev ) =>
            prev.map( ( slide ) =>
                slide.clientId === activeSlideId ? { ...slide, ...updates } : slide
            )
        );
        if ( shouldClose ) {
            setActiveSlideId( null );
        }
    };

    /**
     * Select a slide. If the currently active slide is incomplete, remove it first.
     *
     * @param {string} clientId
     */
    const handleSelectSlide = ( clientId ) => {
        if ( activeSlideId && activeSlideId !== clientId ) {
            const currentSlide = sequence.find( ( slide ) => slide.clientId === activeSlideId );
            if ( currentSlide && ( ! currentSlide.id || ! currentSlide.type ) ) {
                handleRemoveSlide( activeSlideId );
            }
        }
        setActiveSlideId( clientId );
    };

    /**
     * Reorder slides in the sequence.
     *
     * @param {Array} reorderedSequence
     */
    const handleReorder = ( reorderedSequence ) => {
        setSequence( reorderedSequence );
    };

    /**
     * Close the panel. If the active slide is incomplete, remove it.
     */
    const handleClosePanel = () => {
        const activeSlide = sequence.find( ( slide ) => slide.clientId === activeSlideId );
        if ( activeSlide && ( ! activeSlide.id || ! activeSlide.type ) ) {
            handleRemoveSlide( activeSlideId );
        }
        setActiveSlideId( null );
    };

    const activeSlide = sequence.find( ( slide ) => slide.clientId === activeSlideId ) || null;

    return (
        <div className="lp-editor">
            <input
                type="hidden"
                name="learning_path_sequence"
                ref={ hiddenInputRef }
            />
            <div className="lp-editor__main">
                <SlideList
                    sequence={ sequence }
                    activeSlideId={ activeSlideId }
                    onSelectSlide={ handleSelectSlide }
                    onReorder={ handleReorder }
                    onRemoveSlide={ handleRemoveSlide }
                />
                <AddSlideButton onClick={ handleAddSlide } />
            </div>
            { activeSlide && (
                <SlidePanel
                    key={ activeSlide.clientId }
                    slide={ activeSlide }
                    onConfirm={ handleConfirmSlide }
                    onClose={ handleClosePanel }
                />
            ) }
        </div>
    );

}