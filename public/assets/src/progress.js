/**
 * Init Progress
 * 
 * @since   v1.1.0
 * 
 * @param   {Splide}    splide   An instance of the class used to create slider
 * @see     index.js for implementation 
 */

export function initProgress( splide ) {
    const progressMeter = document.querySelector( '#lp-progress-inner' );
    console.log(progressMeter);

    if ( ! progressMeter ) return;

    const updateProgress = ( newIndex ) => {
        const progress = Math.floor( ( ( newIndex + 1 ) / splide.length ) * 100 );
        progressMeter.style.width = `${progress}%`;
    };

    splide.on( 'moved', ( newIndex ) => {
        updateProgress( newIndex );
    } );

    updateProgress( splide.index );
}
