/**
 * SlideForm
 *
 * Form component for editing a slide within the SlidePanel.
 * Handles type selection and renders the appropriate fields
 * based on whether the slide is an Existing Resource or Content Slide.
 *
 * @since 1.0.0
 * @package Learning_Paths
 */

import { useState } from '@wordpress/element';
import { Button, RadioControl, SelectControl, Spinner } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import ResourceSearch from './ResourceSearch';
import { ContentSlideForm } from './ContentSlideForm';

/**
 * Hardcoded list of available templates.
 * In a future build this will be replaced with a filter-based registration system.
 */
const TEMPLATES = [
    { label: 'Default',              value: 'default' },
    { label: 'Title Slide',          value: 'title-slide' },
    { label: 'Two Column',           value: 'two-column' },
];

const SLIDE_TYPES = [
    { label: 'Existing Resource', value: 'internal_resource' },
    { label: 'Content Slide',     value: 'learning_node' },
];

/**
 * 
 * @param {object}      slide       This instance of the slide component
 * @param {function}    onUpdate
 * @param {function}    onClose
 *  
 */

export default function SlideForm( { slide, onConfirm, onClose } ) {

    const [ selectedType, setSelectedType ]         = useState( slide.type || '' );
    const [ selectedTemplate, setSelectedTemplate ] = useState( slide.template || 'default' );
    const [ selectedPost, setSelectedPost ]         = useState(
        slide.id ? { id: slide.id, title: { rendered: slide.title } } : null
    );
    // TODO Combine separate content states into single state
    const [ contentTitle, setContentTitle ]         = useState( slide.title || '' );
    const [ contentBody, setContentBody ]           = useState( slide.content || '' );
    const [ imageId, setImageId ]                   = useState( slide.imageId || null );
    const [ videoEmbed, setVideoEmbed ]             = useState( slide.videoEmbed || '' );
    const [ videoTranscript, setVideoTranscript ]   = useState(  slide.videoTranscript || '' );
    const [ isSaving, setIsSaving ]                 = useState( false );
    const [ error, setError ]                       = useState( null );
    const [ success, setSuccess ]                   = useState( false );

    /**
     * Handle type selection change.
     * Reset post and template selections when type changes.
     *
     * @param {string} type Type of resource
     */
    function handleTypeChange( type ) {
        setSelectedType( type );
        setSelectedPost( null );
        setContentTitle('');
        setContentBody( '' );
        setImageId( null );
        setVideoEmbed('');
        setVideoTranscript('');
        setError( null );
        setSuccess( false );
    }

    /**
     * Handle post selection from ResourceSearch.
     *
     * @param {Object} post
     */
    function handlePostSelect( post ) {
        setSelectedPost( post );
    }

    /**
     * Handle confirmation for Existing Resource slides.
     * Updates the slide with the selected post and template.
     */
    function handleResourceConfirm() {
        if ( ! selectedPost || ! selectedTemplate ) {
            return;
        }

        onConfirm( {
            id:       selectedPost.id,
            type:     'internal_resource',
            template: selectedTemplate,
            title:    selectedPost.title.rendered,
        } );
    }

    /**
     * Handle content slide updates
     */
    function handleContentSlideUpdate(field, update) {
        switch (field) {
            case 'title':
                setContentTitle(update);
                break;
            case 'body':
                setContentBody(update);
                break;
            case 'image':
                setImageId(update);
                break;
            case 'videoEmbed':
                setVideoEmbed(update);
                break;
            case 'videoTranscript':
                setVideoTranscript(update);
                break;
            default:
                break;
        }
    }

    /**
     * Handle confirmation for Content Slide slides.
     * Creates or updates a learning_node post via the REST API.
     */
    async function handleContentConfirm() {
        if ( ! contentTitle || ! selectedTemplate ) {
            return;
        }

        setIsSaving( true );
        setError( null );

        try {
            const isNew  = ! slide.id;
            const path   = isNew
                ? '/wp/v2/learning_node'
                : `/wp/v2/learning_node/${ slide.id }`;

            const response = await apiFetch( {
                path,
                method: 'POST',
                data: {
                    title:   contentTitle,
                    content: contentBody,
                    status:  'publish',
                    meta: {
                        _lp_image_id:         imageId ?? 0,
                        _lp_video_embed:      videoEmbed,
                        _lp_video_transcript: videoTranscript,
                    },
                },
            } );

            onConfirm( {
                id:             response.id,
                type:           'learning_node',
                template:       selectedTemplate,
                title:          contentTitle,
                content:        contentBody,
                imageId:        imageId,
                videoEmbed:     videoEmbed,
                videoTranscript:videoTranscript
            }, false ); // false = don't close panel

            setSuccess( true );
        } catch ( err ) {
            setError( 'Failed to save content slide. Please try again.' );
        } finally {
            setIsSaving( false );
        }
    }

    /**
     * Determine if the confirm button should be disabled.
     *
     * @returns {boolean}
     */
    function isConfirmDisabled() {
        if ( ! selectedType ) {
            return true;
        }
        if ( selectedType === 'internal_resource' ) {
            return ! selectedPost;
        }
        if ( selectedType === 'learning_node' ) {
            return ! contentTitle || isSaving;
        }
        return true;
    }

    return (
        <div className="lp-slide-form">

            { error && (
                <p className="lp-slide-form__error">{ error }</p>
            ) }

            <SelectControl
                label="Template"
                value={ selectedTemplate }
                options={ TEMPLATES }
                onChange={ setSelectedTemplate }
            />

            <RadioControl
                label="Slide Type"
                selected={ selectedType }
                options={ SLIDE_TYPES }
                onChange={ handleTypeChange }
                className="lp-slide-type-control"
            />

            { selectedType === 'internal_resource' && (
                <ResourceSearch
                    selectedPost={ selectedPost }
                    onSelect={ handlePostSelect }
                />
            ) }

            { selectedType === 'learning_node' && (
                <ContentSlideForm 
                    contentTitle = { contentTitle }
                    contentBody = { contentBody }
                    imageId = { imageId }
                    videoEmbed = { videoEmbed }
                    videoTranscript  =  {videoTranscript }
                    onContentUpdate = { handleContentSlideUpdate }
                />
            ) }

            { selectedType && (
                <div className="lp-slide-form__actions">
                    <Button
                        variant="primary"
                        onClick={ selectedType === 'internal_resource' ? handleResourceConfirm : handleContentConfirm }
                        disabled={ isConfirmDisabled() }
                    >
                        { isSaving ? <Spinner /> : 'Confirm' }
                    </Button>
                    <Button
                        variant="tertiary"
                        onClick={ onClose }
                    >
                        { 'Cancel' }
                    </Button>
                </div>
            ) }

            { success && (
                <p className="lp-slide-form__success">
                    { 'Content slide saved successfully. Be sure to save the post, too!' }
                </p>
            ) }
        </div>
    );

}