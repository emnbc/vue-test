module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://pizzashop.emnbc.com',
                changeOrigin: true,
                logLevel: 'debug'
            }
        }
    }
};
