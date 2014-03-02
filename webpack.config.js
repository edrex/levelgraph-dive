var path = require("path");

module.exports = {
    entry: {
      app: "./src/app.js",
    },
    output: {
        path: path.join(__dirname, "app"),
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    },
    module: {
        loaders: [
            { test: /\.json$/, loader: "json" }
        ]
    }
}