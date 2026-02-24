/**
 * SlidePanel
 *
 * Displays the editing panel for the currently selected slide.
 * Acts as a container for SlideForm and handles the panel
 * header and close behavior.
 *
 * @since 1.0.0
 * @package Learning_Paths
 */

import { Button } from '@wordpress/components';
import SlideForm from './SlideForm';

export default function SlidePanel( { slide, onConfirm, onClose } ) {

    /**
     * Determine the panel title based on the slide's current state.
     *
     * @returns {string}
     */
    function getPanelTitle() {
        if ( ! slide.type ) {
            return 'New Slide';
        }
        if ( slide.type === 'internal_resource' ) {
            return 'Existing Resource';
        }
        if ( slide.type === 'learning_node' ) {
            return 'Content Slide';
        }
        return 'Edit Slide';
    }

    return (
        <div className="lp-slide-panel">
            <div className="lp-slide-panel__header">
                <h2 className="lp-slide-panel__title">
                    { getPanelTitle() }
                </h2>
                <Button
                    icon="no-alt"
                    label="Close panel"
                    onClick={ onClose }
                    size="small"
                />
            </div>
            <div className="lp-slide-panel__body">
                <SlideForm
                    slide={ slide }
                    onConfirm={ onConfirm }
                    onClose={ onClose }
                />
            </div>
        </div>
    );

}