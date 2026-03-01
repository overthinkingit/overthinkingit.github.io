module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");

  eleventyConfig.addCollection("concepts", function(api) {
    return api.getFilteredByGlob("concepts/*.njk")
      .filter(item => item.fileSlug !== "index")
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });

  eleventyConfig.addCollection("suttas", function(api) {
    return api.getFilteredByGlob("suttas/*.njk")
      .filter(item => item.fileSlug !== "index")
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};
