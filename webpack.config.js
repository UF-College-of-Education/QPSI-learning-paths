/**
 * Extends the default build from @wordpress/scripts so that it looks for
 * the src folder in admin/js and outputs to admin/js
 */
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
    ...defaultConfig,
    entry: './admin/js/src/index.js',
    output: {
        path: path.resolve(__dirname, 'admin/js'),
        filename: 'learning-paths-admin.js'
    }
};
