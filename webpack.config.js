/**
 * Extends the default build from @wordpress/scripts so that it looks for
 * the src folder in admin/js and outputs to admin/js
 */
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

const adminConfig = {
    ...defaultConfig,
    entry: {
        'learning-paths-admin': './admin/assets/src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'admin/assets'),
        filename: '[name].js',
    },
};

const publicConfig = {
    ...defaultConfig,
    entry: {
        'learning-paths-public': './public/assets/src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'public/assets'),
        filename: '[name].js',
    },
};

module.exports = [ adminConfig, publicConfig ];