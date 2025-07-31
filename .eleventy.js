const faviconsPlugin = require("eleventy-plugin-gen-favicons");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const EleventyPluginRobotsTxt = require("eleventy-plugin-robotstxt");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPlugin(faviconsPlugin, {});
    eleventyConfig.addPlugin(sitemap, {
        sitemap: {
        hostname: "https://links.krispayne.com",
        },
    });
  
  /** @type {import("eleventy-plugin-robotstxt/typedefs.js").EleventyPluginRobotsTxtOptions} */
  const eleventyPluginRobotsTxtOptions = {
      sitemapURL: "https://links.krispayne.com/sitemap.xml",
      shouldBlockAIRobots: true,
    };
  eleventyConfig.addPlugin(EleventyPluginRobotsTxt,eleventyPluginRobotsTxtOptions);
    
    return {
        dir: {
            input: "src",
            output: "_site"
        },
    };
};