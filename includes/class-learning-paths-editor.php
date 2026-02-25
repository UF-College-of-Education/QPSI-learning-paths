<?php
/**
 * The learning path editor functionality.
 *
 * Handles the meta box registration, script enqueueing,
 * and saving of the learning path sequence data.
 *
 * @since      1.0.0
 *
 * @package    Learning_Paths
 * @subpackage Learning_Paths/admin
 */
class Learning_Paths_Editor {

    /**
     * The ID of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $name    The ID of this plugin.
     */
    private $name;

    /**
     * The version of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $version    The current version of this plugin.
     */
    private $version;

    /**
     * The post meta key used to store the learning path sequence.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $meta_key
     */
    private $meta_key = '_learning_path_sequence';

    /**
     * Initialize the class and set its properties.
     *
     * @since    1.0.0
     * @param    string    $name       The name of this plugin.
     * @param    string    $version    The version of this plugin.
     */
    public function __construct( $name, $version ) {
        $this->name    = $name;
        $this->version = $version;
    }

    /**
     * Register the meta box for the learning path editor.
     *
     * @since    1.0.0
     */
    public function register_meta_box() {
        add_meta_box(
            'learning-paths-editor',
            __( 'Learning Path Sequence', 'learning-paths' ),
            [ $this, 'render_meta_box' ],
            'learning_path',
            'normal',
            'high'
        );
    }

    /**
     * Render the meta box container for the React editor.
     *
     * @since    1.0.0
     * @param    WP_Post    $post    The current post object.
     */
    public function render_meta_box( $post ) {
        wp_nonce_field( 'learning_path_sequence_save', 'learning_path_sequence_nonce' );
        ?>
        <div id="learning-paths-editor-root" data-post-id="<?php echo esc_attr( $post->ID ); ?>"></div>
        <?php
    }

    /**
     * Enqueue the React editor scripts and styles on the learning path edit screen.
     *
     * @since    1.0.0
     * @param    string    $hook    The current admin page hook.
     */
    public function enqueue_editor_assets( $hook ) {
        if ( ! in_array( $hook, [ 'post.php', 'post-new.php' ] ) ) {
            return;
        }

        $screen = get_current_screen();
        if ( ! $screen || $screen->post_type !== 'learning_path' ) {
            return;
        }

        $asset_file = plugin_dir_path( dirname( __FILE__ ) ) . 'admin/assets/learning-paths-admin.asset.php';

        if ( ! file_exists( $asset_file ) ) {
            return;
        }

        $asset = require $asset_file;

        wp_enqueue_media();

        wp_enqueue_script(
            $this->name . '-editor',
            plugin_dir_url( dirname( __FILE__ ) ) . 'admin/assets/learning-paths-admin.js',
            $asset['dependencies'],
            $asset['version'],
            true
        );

        global $post;
        $sequence_raw = get_post_meta( $post->ID, $this->meta_key, true );
        $sequence     = $sequence_raw ? json_decode( $sequence_raw ) : [];

        wp_localize_script(
            $this->name . '-editor',
            'learningPathsData',
            [
                'sequence' => $sequence,
                'postId'   => $post->ID,
            ]
        );
    }

    /**
     * Save the learning path sequence post meta.
     *
     * @since    1.0.0
     * @param    int    $post_id    The ID of the post being saved.
     */
    public function save_sequence( $post_id ) {
        if ( ! isset( $_POST['learning_path_sequence_nonce'] ) ) {
            return;
        }

        if ( ! wp_verify_nonce( wp_unslash( $_POST['learning_path_sequence_nonce'] ), 'learning_path_sequence_save' ) ) {
            return;
        }

        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
            return;
        }

        if ( ! current_user_can( 'edit_post', $post_id ) ) {
            return;
        }

        if ( ! isset( $_POST['learning_path_sequence'] ) ) {
            return;
        }

        $sequence = wp_unslash( $_POST['learning_path_sequence'] );

        // Validate that the value is valid JSON before saving.
        json_decode( $sequence );
        if ( json_last_error() !== JSON_ERROR_NONE ) {
            return;
        }

        update_post_meta( $post_id, $this->meta_key, $sequence );
    }

}