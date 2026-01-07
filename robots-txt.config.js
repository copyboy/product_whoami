// https://www.npmjs.com/package/astro-robots-txt
module.exports = {
  policy: [
    {
      userAgent: '*',
      allow: '/',
      disallow: ['/404'],
    },
  ],
  sitemap: true, // Auto-detect sitemap from astro.config.mjs
};
