<?php
$learning_path_post_type = new Learning_Paths_Post_Type('learning_path',[
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
    'capability_type' => 'post',    
    'supports' => ['title', 'revisions', 'custom-fields', 'author'],
    //'register_meta_box_cb' => '', // Set up callback for meta boxes to hold custom data'
]);