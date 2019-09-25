module.exports = {
  plugins: [
    require('autoprefixer')({
      'browsers': [
        'defaults',
        'not ie < 11',
        'last 2 versions',
        '> 1%',
        'iOS 7',
        'last 3 iOS versions'
      ]
    })
    // {
    //   "browserslist": [
    //     "last 1 version",
    //     "> 1%",
    //     "maintained node versions",
    //     "not dead"
    //   ]
    // }
  ]

};
