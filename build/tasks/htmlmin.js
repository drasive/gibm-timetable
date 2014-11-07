module.exports = {
  options: {
    removeComments: true,
    removeCommentsFromCDATA: true,
    removeCDATASectionsFromCDATA: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    removeOptionalTags: true,
    removeIgnored: true
  },

  prod: {
    files: [
      {
	    expand: true,
        cwd: '.tmp/dist/',
        src: ['**/*.html'],
        dest: '.tmp/dist/'
      }
    ]
  }
};
