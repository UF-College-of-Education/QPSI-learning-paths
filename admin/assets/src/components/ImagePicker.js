/**
 * ImagePicker
 *
 * Allows authors to select an image from the WordPress media library.
 * Stores the attachment ID and displays a preview of the selected image.
 *
 * @since 1.0.0
 * @package Learning_Paths
 */

import { useState, useEffect, useRef } from '@wordpress/element';
import { Button } from '@wordpress/components';

export default function ImagePicker( { imageId, onSelect, onRemove } ) {

    const [ previewUrl, setPreviewUrl ] = useState( null );
    const mediaFrameRef                 = useRef( null );

    /**
     * If an imageId is already set, fetch the attachment URL for the preview.
     */
    useEffect( () => {
        if ( ! imageId ) {
            setPreviewUrl( null );
            return;
        }

        const attachment = window.wp.media.attachment( imageId );
        attachment.fetch().then( () => {
            const url = attachment.get( 'sizes' )?.medium?.url || attachment.get( 'url' );
            setPreviewUrl( url );
        } );
    }, [ imageId ] );

    /**
     * Open the WordPress media library modal.
     */
    function openMediaLibrary() {
        if ( ! mediaFrameRef.current ) {
            mediaFrameRef.current = window.wp.media( {
                title:    'Select Image',
                button:   { text: 'Select' },
                multiple: false,
                library:  { type: 'image' },
            } );

            mediaFrameRef.current.on( 'select', () => {
                const attachment = mediaFrameRef.current.state().get( 'selection' ).first().toJSON();
                const url        = attachment.sizes?.medium?.url || attachment.url;
                setPreviewUrl( url );
                onSelect( attachment.id );
            } );
        }

        mediaFrameRef.current.open();
    }

    /**
     * Remove the selected image.
     */
    function handleRemove() {
        setPreviewUrl( null );
        onRemove();
    }

    return (
        <div className="lp-image-picker">
            <p className="lp-image-picker__label" id="lp-image-picker-label">
                { 'Image' }
                <span className="lp-image-picker__optional">{ ' (optional)' }</span>
            </p>
            { previewUrl && (
                <div className="lp-image-picker__preview" aria-labelledby="lp-image-picker-label">
                    <img
                        src={ previewUrl }
                        alt="Selected slide image"
                        className="lp-image-picker__preview-img"
                    />
                </div>
            ) }
            <div className="lp-image-picker__controls" role="group" aria-labelledby="lp-image-picker-label">
                <Button
                    variant="secondary"
                    onClick={ openMediaLibrary }
                >
                    { imageId ? 'Change Image' : 'Add Image' }
                </Button>
                { imageId && (
                    <Button
                        variant="tertiary"
                        isDestructive
                        onClick={ handleRemove }
                    >
                        { 'Remove Image' }
                    </Button>
                ) }
            </div>
        </div>
    );

}