module.exports = {
  context: __dirname + '/javascripts.src',
  entry: "./index.js",
  output: {
    path: __dirname,
    filename: "public/javascripts/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel?presets[]=react'
      }
    ],
  }
};