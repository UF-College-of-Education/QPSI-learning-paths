/**
 * AddSlideButton
 *
 * Add a new empty slide to the sequence.
 *
 * @since 1.0.0
 * @package Learning_Paths
 */

import { Button } from '@wordpress/components';

export default function AddSlideButton( { onClick } ) {

    return (
        <div className="lp-add-slide">
            <Button
                variant="secondary"
                icon="plus-alt2"
                onClick={ onClick }
            >
                { 'Add Slide' }
            </Button>
        </div>
    );

}