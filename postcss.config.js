// postcss.config.js
const purgecss = require('@fullhuman/postcss-purgecss')({
    content: [
      './src/**/*.js',
      './src/**/*.jsx',
      // مسیرهای فایل‌های دیگر
    ],
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
  });
  
  module.exports = {
    plugins: [
      // سایر پلاگین‌ها
      ...process.env.NODE_ENV === 'production' ? [purgecss] : []
    ]
  };
  