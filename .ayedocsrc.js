module.exports = {
  url: 'https://schemata.lamnhan.com/content/reference',
  srcPath: './projects/schemata/src',
  cleanOutput: true,
  webRender: {
    out: 'docs/content',
  },
  fileRender: {
    'docs/content/schemas/category.md': {main: ['Category', 'SUMMARY_PROPERTIES']},
    'docs/content/schemas/tag.md': {main: ['Tag', 'SUMMARY_PROPERTIES']},
    'docs/content/schemas/page.md': {main: ['Page', 'SUMMARY_PROPERTIES']},
    'docs/content/schemas/post.md': {main: ['Post', 'SUMMARY_PROPERTIES']},
  }
};
