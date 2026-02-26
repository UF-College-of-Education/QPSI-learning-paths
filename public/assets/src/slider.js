/**
 * Slider
 *
 * Initializes Splide sliders for all learning path shortcode
 * containers found on the page.
 *
 * @since 1.0.0
 * @package Learning_Paths
 */

import Splide from '@splidejs/splide';

/**
 * Initialize all learning path sliders on the page.
 */
export function initSliders() {
    const sliders = document.querySelectorAll( '.lp-slider' );

    sliders.forEach( ( slider ) => {
        new Splide( slider, {
            type:        'slide',
            rewind:      false,
            arrows:      true,
            pagination:  false,
            keyboard:    true,
            accessibility: true,
        } ).mount();
    } );
}