<?php

/**
 * Register files to include in the plugin
 *
 * @since      1.0.0
 *
 * @package    Learning_Paths
 * @subpackage Learning_Paths/includes
 */

/**
 * Include specified files for the plugin.
 *
 * @package    Learning_Paths
 * @subpackage Learning_Paths/includes
 * @author     Jon Walker <jonathan.walker@ufl.edu>
 */
class Learning_Paths_File_Loader {

	/**
	 * The array of actions registered with WordPress.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      array    $files    Files to be loaded.
	 */
	protected $files=[];

	/**
	 * Initialize the collection of files to be included in app.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {

		$this->files = [];

	}

	/**
	 * Add files to the collection to be registered to be included.
	 *
	 * @since    1.0.0
	 * @param string|array 	$file_path 		File path or array of file paths.
	 */
	public function register( $file_path ) {

        if ( is_array( $file_path ) ) {
            foreach ( $file_path as $file ) {
                $this->register_file( $file );
            }
        } else {
            $this->register_file( $file_path );
        }

    }

	/**
     * Register all PHP files inside folder automatically for inclusion.
     *
     * @param string 	$directory 	Directory path.
     * @param bool 		$recursive 	Whether to scan sub-folders within main folder.
     */
    public function register_directory( $directory, $recursive = false ) {

        if ( ! is_dir( $directory ) ) {
            error_log( 'Plugin Loader Error: Directory not found - ' . $directory );
            return;
        }

        $files = $recursive
            ? $this->get_php_files_recursive( $directory )
            : glob( trailingslashit( $directory ) . '*.php' );

        foreach ( $files as $file ) {
            $this->register_file( $file );
        }
    
	}

    /**
     * Register a single file.
	 * 
	 * @param string 	$file 	File to be added to 
     */
    protected function register_file( $file ) {

        if ( file_exists( $file ) ) {
            $this->files[] = $file;
        } else {
            error_log( 'Plugin Loader Error: File not found - ' . $file );
        }

    }

    /**
     * Recursively get all PHP files in a directory.
	 * 
	 * @param string $directory	Path to the directory
     */
    protected function get_php_files_recursive( $directory ) {

        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator( $directory )
        );
        $php_files = [];

        foreach ( $iterator as $file ) {
            if ( $file->isFile() && strtolower( $file->getExtension() ) === 'php' ) {
                $php_files[] = $file->getRealPath();
            }
        }

        return $php_files;

    }

	/**
     * Load all registered files.
     */
    public function load() {
        foreach ( $this->files as $file ) {
            require_once $file;
        }
    }

}
