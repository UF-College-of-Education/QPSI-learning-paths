<?php
/**
 * Learning Path Posts
 */
$learning_path_post_type = new Learning_Paths_Post_Type('learning_path',
    [
        // $args
        'labels' => [
            'name' => 'Learning Paths',
            'singular_name' => 'Learning Path',
            'add_new_item' => 'Add New Learning Path',
            'edit_item' => 'Edit Learning Path',
            'new_item' => 'New Learning Path',
            'view_item' => 'View Learning Path',
            'search_items' => 'Search Learning Paths',
            'not_found' => 'No learning paths found',
            'not_found_in_trash' => 'No learning paths found in Trash',
        ],
        'description' => 'Course sequence of content.',
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_rest'        => true,
        'capability_type' => 'post',    
        'supports' => ['title', 'revisions', 'custom-fields', 'author'],
        //'register_meta_box_cb' => '', // Set up callback for meta boxes to hold custom data'
    ],
    // Adding Custom Post Meta
    [
        'key'  => '_learning_path_sequence',
        'args' => [
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => 'string',
            'auth_callback' => function() {
                return current_user_can( 'edit_posts' );
            },
        ],
    ], 
    false
);

/**
 * Learning Node Posts
 * 
 * These are the slides in the Learning Path that are not resources.
 */
$learning_node_post_type = new Learning_Paths_Post_Type( 'learning_node', [
    'labels' => [
        'name'               => 'Learning Nodes',
        'singular_name'      => 'Learning Node',
        'add_new_item'       => 'Add New Learning Node',
        'edit_item'          => 'Edit Learning Node',
        'new_item'           => 'New Learning Node',
        'view_item'          => 'View Learning Node',
        'search_items'       => 'Search Learning Nodes',
        'not_found'          => 'No learning nodes found',
        'not_found_in_trash' => 'No learning nodes found in Trash',
    ],
    'description'         => 'A single slide or node within a learning path.',
    'public'              => false,
    'publicly_queryable'  => false,
    'show_ui'             => true,
    'show_in_menu'        => false,
    'show_in_nav_menus'   => false,
    'exclude_from_search' => true,
    'has_archive'         => false,
    'show_in_rest'        => true,
    'capability_type'     => 'post',
    'supports'            => [ 'title', 'editor', 'revisions', 'custom-fields', 'author' ],
],
[
    [
        'key'  => '_lp_image_id',
        'args' => [ 
            'show_in_rest' => true,
                'single' => true,
                'type' => 'integer',
                'auth_callback' => function() {
                    return current_user_can( 'edit_posts' );
                },
            ],
    ],
    [
        'key'  => '_lp_video_embed',
        'args' => [ 
            'show_in_rest' => true,
                'single' => true,
                'type' => 'string',
                'auth_callback' => function() {
                    return current_user_can( 'edit_posts' );
                },
            ],
    ],
    [
        'key'  => '_lp_video_transcript',
        'args' => [ 
            'show_in_rest' => true,
                'single' => true,
                'type' => 'string',
                'auth_callback' => function() {
                    return current_user_can( 'edit_posts' );
                },
            ],
    ],
] );
