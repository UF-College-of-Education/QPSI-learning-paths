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

    public function __construct( $post_type, $args) {
        $this->post_type = $post_type;
        $this->args = $args;

        add_action('init', [$this, 'register']);
    }

    public function register() {
        register_post_type($this->post_type, $this->args);
    }
}