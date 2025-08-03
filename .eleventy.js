const faviconsPlugin = require("eleventy-plugin-gen-favicons");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const EleventyPluginRobotsTxt = require("eleventy-plugin-robotstxt");
const fs = require("fs");

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
    
  eleventyConfig.on("afterBuild", () => {
    const dataPath = "./src/_data/shortlinks.json";
    if (!fs.existsSync(dataPath)) return;

    const links = require(dataPath);
    const redirects = links.map(
      (link) => `/${link.slug} /${link.slug}/index.html 200`
    );

    fs.writeFileSync("_site/_redirects", redirects.join("\n"));
  });

    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
            data: "_data",
        },
    };
};