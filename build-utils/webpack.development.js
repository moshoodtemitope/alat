module.exports = () => ({
    module: {
        rules: [
            {
                test: /\.(sa?css|css)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    }
});
