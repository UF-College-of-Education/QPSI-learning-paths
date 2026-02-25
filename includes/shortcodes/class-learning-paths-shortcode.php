<?php

/**
 * Base Shortcode Class
 *
 * A reusable base class for registering WordPress shortcodes.
 * Extend this class to create specific shortcode implementations.
 *
 * @since      1.0.0
 *
 * @package    Learning_Paths
 * @subpackage Learning_Paths/includes/shortcodes
 */
class Learning_Paths_Shortcode {

    /**
     * The shortcode tag.
     *
     * @since    1.0.0
     * @access   protected
     * @var      string    $tag
     */
    protected $tag;

    /**
     * Default shortcode attributes.
     *
     * @since    1.0.0
     * @access   protected
     * @var      array    $defaults
     */
    protected $defaults;

    /**
     * Initialize the class and register the shortcode.
     *
     * @since    1.0.0
     * @param    string    $tag        The shortcode tag.
     * @param    array     $defaults   Default attributes. Default empty array.
     */
    public function __construct( $tag, $defaults = [] ) {
        $this->tag      = $tag;
        $this->defaults = $defaults;

        add_shortcode( $this->tag, [ $this, 'render' ] );
    }

    /**
     * Render the shortcode output.
     * Override this method in child classes.
     *
     * @since    1.0.0
     * @param    array     $atts       Shortcode attributes.
     * @param    string    $content    Shortcode content. Default null.
     * @return   string               The rendered HTML output.
     */
    public function render( $atts, $content = null ) {
        $atts = shortcode_atts( $this->defaults, $atts, $this->tag );
        return '';
    }

}