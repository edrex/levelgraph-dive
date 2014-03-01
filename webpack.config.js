module.exports = {
    entry: {
      app: "./src/app.js",
      bower: "./src/libs.js"
    },
    output: {
        filename: "./app/[name].bundle.js",
    },
    module: {
        loaders: [
            { test: /\.json$/, loader: "json" }
        ]
    }
}