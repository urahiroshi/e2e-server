module.exports = {
  context: __dirname + '/javascripts.src',
  entry: './index.jsx',
  output: {
    path: __dirname,
    filename: "public/javascripts/index.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel?presets[]=react'
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.svg$/, loader: 'url-loader?mimetype=image/svg+xml' },
      { test: /\.woff$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.woff2$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.eot$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.ttf$/, loader: 'url-loader?mimetype=application/font-woff' }
    ],
  }
};