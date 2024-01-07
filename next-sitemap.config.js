/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://jonggulog.vercel.app",
  changefreq: "daily",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/"
      }
    ]
  },
  priority: 0.7,
  sitemapSize: 7000,
  generateRobotsTxt: true,
  exclude: []
};
