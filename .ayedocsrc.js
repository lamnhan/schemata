module.exports = {
  url: 'https://schemata.lamnhan.com/content/reference',
  srcPath: './projects/schemata/src',
  cleanOutput: true,
  webRender: {
    out: 'docs/content',
  },
  fileRender: {
    'docs/content/schemas/audio.md': {main: ['Audio', 'SUMMARY_PROPERTIES']},
    'docs/content/schemas/author.md': {main: ['Author', 'SUMMARY_PROPERTIES']},
    'docs/content/schemas/bundle.md': {main: ['Bundle', 'SUMMARY_PROPERTIES']},
    'docs/content/schemas/category.md': {main: ['Category', 'SUMMARY_PROPERTIES']},
    'docs/content/schemas/meta.md': {main: ['Meta', 'SUMMARY_PROPERTIES']},
    'docs/content/schemas/notification.md': {main: ['Notification', 'SUMMARY_PROPERTIES']},
    'docs/content/schemas/option.md': {main: ['Option', 'SUMMARY_PROPERTIES']},
    'docs/content/schemas/order.md': {main: ['Order', 'SUMMARY_PROPERTIES']},
    'docs/content/schemas/page.md': {main: ['Page', 'SUMMARY_PROPERTIES']},
    'docs/content/schemas/post.md': {main: ['Post', 'SUMMARY_PROPERTIES']},
    'docs/content/schemas/product.md': {main: ['Product', 'SUMMARY_PROPERTIES']},
    'docs/content/schemas/profile.md': {main: ['Profile', 'SUMMARY_PROPERTIES']},
    'docs/content/schemas/promotion.md': {main: ['Promotion', 'SUMMARY_PROPERTIES']},
    'docs/content/schemas/tag.md': {main: ['Tag', 'SUMMARY_PROPERTIES']},
    'docs/content/schemas/thread.md': {main: ['Thread', 'SUMMARY_PROPERTIES']},
    'docs/content/schemas/user.md': {main: ['User', 'SUMMARY_PROPERTIES']},
    'docs/content/schemas/video.md': {main: ['Video', 'SUMMARY_PROPERTIES']},
  }
};
