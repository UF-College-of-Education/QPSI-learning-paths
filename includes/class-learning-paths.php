<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the dashboard.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    Learning_Paths
 * @subpackage Learning_Paths/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, dashboard-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Learning_Paths
 * @subpackage Learning_Paths/includes
 * @author     Jon Walker <jonathan.walker@ufl.edu>
 */
class Learning_Paths {

	/**
	 * The loader that's responsible for registering PHP files to be included in
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Learning_Paths_File_Loader    $file_loader    Registers PHP files to be included
	 */
	protected $file_loader;

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Learning_Paths_Hook_Loader    $hook_loader    Maintains and registers all hooks for the plugin.
	 */
	protected $hook_loader;


	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $Learning_Paths    The string used to uniquely identify this plugin.
	 */
	protected $Learning_Paths;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the Dashboard and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {

		$this->Learning_Paths = 'learning-paths';
		$this->version = '1.0.0';

		$this->load_dependencies();
		$this->set_locale();
		$this->load_includes_files();
		$this->define_admin_hooks();
		$this->define_public_hooks();

	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Learning_Paths_Loader. Orchestrates the hooks of the plugin.
	 * - Learning_Paths_i18n. Defines internationalization functionality.
	 * - Learning_Paths_Admin. Defines all hooks for the dashboard.
	 * - Learning_Paths_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {

		/**
		 * The class responsible for orchestrating the PHP files included in the plugin
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-learning-paths-file-loader.php';

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-learning-paths-hook-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-learning-paths-i18n.php';

		/**
		 * The class responsible for defining all actions that occur in the Dashboard.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-learning-paths-admin.php';

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-learning-paths-public.php';

		$this->file_loader = new Learning_Paths_File_Loader();
		$this->hook_loader = new Learning_Paths_Hook_Loader();

	}

	/**
	 * LOAD INCLUDES FILES
	 * 
	 * Defines the include files to be loaded
	 *
	 * Load all files in a directory with register_directory( $directory, $recursive = false )
	 * Load single files with register_file( $file ) 
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_includes_files() {
	
		$base_url = plugin_dir_path( dirname( __FILE__ ) );
		$this->file_loader->register_directory($base_url . 'includes/post-types');
		$this->file_loader->register_directory($base_url . 'includes/shortcodes');
		$this->file_loader->load();
	
	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Learning_Paths_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {

		$plugin_i18n = new Learning_Paths_i18n();
		$plugin_i18n->set_domain( $this->get_Learning_Paths() );

		$this->hook_loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );

	}

	/**
	 * Register all of the hooks related to the dashboard functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks() {

		$plugin_admin = new Learning_Paths_Admin( $this->get_Learning_Paths(), $this->get_version() );

		$this->hook_loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
		$this->hook_loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );

	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks() {

		$plugin_public = new Learning_Paths_Public( $this->get_Learning_Paths(), $this->get_version() );

		$this->hook_loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );
		$this->hook_loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );

	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {
		$this->hook_loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_Learning_Paths() {
		return $this->Learning_Paths;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Learning_Paths_Hook_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->hook_loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}

}
