module.exports = {
  url: 'https://schemata.lamnhan.com/content/reference',
  srcPath: './projects/schemata/src',
  cleanOutput: true,
  webRender: {
    out: 'docs/content',
  },
  fileRender: {
    'docs/content/schemas/post.md': {main: ['Post', 'SUMMARY_PROPERTIES']},
  }
};
