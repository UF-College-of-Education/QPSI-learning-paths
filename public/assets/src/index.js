/**
 * Learning Paths Public
 *
 * Entry point for the public-facing slideshow.
 * Initializes Splide on any learning path slider containers found on the page.
 *
 * @since 1.0.0
 * @package Learning_Paths
 */

// CSS 
import '@splidejs/splide/dist/css/splide.min.css';
import './index.css';

// JS Starts
import { initSliders } from './slider';
import { initProgress } from './progress';

document.addEventListener( 'DOMContentLoaded', () => {
    const instances = initSliders();
    console.log(instances);
    instances.forEach( ( splide ) => initProgress( splide ) );
} );