<?php

/**
 * Learning Path Slider Shortcode
 *
 * Extends the base shortcode class to implement the [learning_path]
 * shortcode, which outputs a Splide-powered slideshow for a learning path.
 *
 * Usage: [learning_path id="123"]
 *
 * @since      1.0.0
 *
 * @package    Learning_Paths
 * @subpackage Learning_Paths/includes/shortcodes
 */
class Learning_Path_Slider_Shortcode extends Learning_Paths_Shortcode {

    /**
     * The post meta key used to retrieve the learning path sequence.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $meta_key
     */
    private $meta_key = '_learning_path_sequence';

    /**
     * Path to the slide template directory.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $template_dir
     */
    private $template_dir;

    /**
     * Initialize the class.
     *
     * @since    1.0.0
     */
    public function __construct() {
        $this->template_dir = plugin_dir_path( dirname( __FILE__, 2 ) ) . 'public/partials/';

        parent::__construct( 'learning_path', [ 'id' => null ] );
    }

    /**
     * Render the learning path shortcode.
     *
     * @since    1.0.0
     * @param    array     $atts       Shortcode attributes.
     * @param    string    $content    Shortcode content. Default null.
     * @return   string               The rendered HTML output.
     */
    public function render( $atts, $content = null ) {
        $atts    = shortcode_atts( $this->defaults, $atts, $this->tag );
        $post_id = ! empty( $atts['id'] ) ? absint( $atts['id'] ) : get_the_ID();

        if ( ! $post_id ) {
            return '';
        }

        $post = get_post( $post_id );

        if ( ! $post || $post->post_type !== 'learning_path' ) {
            return '';
        }

        $sequence_raw = get_post_meta( $post_id, $this->meta_key, true );
        $sequence     = json_decode( $sequence_raw, true );

        if ( empty( $sequence ) ) {
            return '';
        }

        $total_slides = count( $sequence );

        ob_start();
        ?>
        <div class="lp-slider splide" aria-label="<?php echo esc_attr( get_the_title( $post_id ) ); ?>">
            <div class="splide__track">
                <ul class="splide__list">
                    <?php foreach ( $sequence as $index => $slide ) : ?>
                        <li class="splide__slide" data-slide-index="<?php echo esc_attr($index + 1) ?>" >
                            <?php $this->render_slide( $slide, $index + 1, $total_slides ); ?>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </div>

        <div id="lp-progress"> 
            <div id="lp-progress-inner"></div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Render a single slide using its template.
     *
     * @since    1.0.0
     * @param    array    $slide          The slide data array.
     * @param    int      $slide_number   The current slide number.
     * @param    int      $total_slides   The total number of slides.
     */
    private function render_slide( $slide, $slide_number, $total_slides ) {
        $template = ! empty( $slide['template'] ) ? $slide['template'] : 'default';
        $post_id  = ! empty( $slide['id'] ) ? absint( $slide['id'] ) : null;

        if ( ! $post_id ) {
            return;
        }

        $post = get_post( $post_id );

        if ( ! $post ) {
            return;
        }

        $template_file = $this->template_dir . 'slide-' . sanitize_file_name( $template ) . '.php';

        if ( ! file_exists( $template_file ) ) {
            $template_file = $this->template_dir . 'slide-default.php';
        }

        if ( ! file_exists( $template_file ) ) {
            return;
        }

        include $template_file;
    }

}