/**
 * Learning Paths Admin Editor
 * 
 * Entry point for the React-based learning path editor.
 * 
 * @since 1.0.0
 * @package Learning_Paths
 */

import { createRoot } from '@wordpress/element';
import LearningPathEditor from './components/LearningPathEditor';

const container = document.getElementById( 'learning-paths-editor-root' );

if ( container ) {
    const root = createRoot( container );
    root.render( <LearningPathEditor />);
}