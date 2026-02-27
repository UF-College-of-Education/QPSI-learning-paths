<?php

/**
 * Register custom post type
 * 
 * @since      1.0.0
 *
 * @package    Learning_Paths
 * @subpackage Learning_Paths/includes
 */

 class Learning_Paths_Post_Type {
    protected string $post_type;
    protected array $args;
    protected $custom_post_meta;
    protected bool $gutenberg_enabled;

    public function __construct( 
        $post_type, 
        $args, 
        $custom_post_meta = false, 
        $gutenberg_enabled = true
    ) {
        $this->post_type = $post_type;
        $this->args = $args;
        $this->custom_post_meta = $custom_post_meta ;
        $this->gutenberg_enabled = $gutenberg_enabled;

        add_action('init', [$this, 'register']);

        if ( $this->custom_post_meta !== false ) { 
            add_action( 'init', [ $this, 'register_custom_meta' ] ); 
        }

        if (! $this->gutenberg_enabled ) { 
            add_filter( 'use_block_editor_for_post_type', 
            function( bool $use_block_editor, string $post_type ) {
                return $post_type === $this->post_type ? false : $use_block_editor;
            }, 10, 2 );
        }
    }

    /**
     * Register post type.
     */
    public function register() {
        register_post_type($this->post_type, $this->args);
    }

    /**
     * Register post meta for this post type.
     */
    public function register_custom_meta() {
        if ( empty( $this->custom_post_meta ) ) {
            return;
        }
    
        // Support both a single field and an array of fields.
        $fields = isset( $this->custom_post_meta['key'] )
            ? [ $this->custom_post_meta ]
            : $this->custom_post_meta;
    
        foreach ( $fields as $field ) {
            if ( empty( $field['key'] ) || empty( $field['args'] ) ) {
                continue;
            }
            register_post_meta( $this->post_type, $field['key'], $field['args'] );
        }
    }

}