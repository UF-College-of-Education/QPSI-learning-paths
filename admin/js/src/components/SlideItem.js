/**
 * SlideItem
 *
 * Represents a single slide in the learning path sequence list.
 * Displays the slide label, reorder buttons, and a remove button.
 *
 * @since 1.0.0
 * @package Learning_Paths
 */

import { Button } from '@wordpress/components';

/**
 * Get a human readable label for the slide based on its current state.
 *
 * @param {Object} slide
 * @returns {string}
 */
function getSlideLabel( slide ) {
    if ( ! slide.type ) {
        return 'New Slide';
    }
    if ( slide.title ) {
        return slide.title;
    }
    if ( slide.type === 'internal_resource' ) {
        return 'Existing Resource';
    }
    if ( slide.type === 'learning_node' ) {
        return 'Content Slide';
    }
    return 'Untitled Slide';
}

export default function SlideItem( {
    slide,
    index,
    isActive,
    isFirst,
    isLast,
    onSelect,
    onMoveUp,
    onMoveDown,
    onRemove,
} ) {

    const label = getSlideLabel( slide );

    return (
        <li className={ `lp-slide-item${ isActive ? ' lp-slide-item--active' : '' }` }>
            <div className="lp-slide-item__info" onClick={ onSelect }>
                <span className="lp-slide-item__index">{ index + 1 }</span>
                { slide.type && (
                    <span className="lp-slide-item__type">
                        { slide.type === 'internal_resource' ? 'Resource: ' : 'Content Slide: ' }
                    </span>
                ) }
                <span className="lp-slide-item__label">{ label }</span>
            </div>
            <div className="lp-slide-item__controls">
                <Button
                    icon="arrow-up-alt2"
                    label="Move slide up"
                    onClick={ onMoveUp }
                    disabled={ isFirst }
                    size="small"
                />
                <Button
                    icon="arrow-down-alt2"
                    label="Move slide down"
                    onClick={ onMoveDown }
                    disabled={ isLast }
                    size="small"
                />
                <Button
                    icon="trash"
                    label="Remove slide"
                    onClick={ onRemove }
                    isDestructive
                    size="small"
                />
            </div>
        </li>
    );

}