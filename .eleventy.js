module.exports = function(eleventyConfig) {
  // Bust Node's require cache for _data/*.js on each build. Without this,
  // `eleventy --serve` can keep serving a stale guide.js (and other JS data)
  // across rebuilds triggered by unrelated file changes.
  eleventyConfig.on("eleventy.before", function () {
    for (const key of Object.keys(require.cache)) {
      if (key.replace(/\\/g, "/").includes("/_data/")) {
        delete require.cache[key];
      }
    }
  });

  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("favicon.ico");

  eleventyConfig.addCollection("concepts", function(api) {
    return api.getFilteredByGlob("concepts/*.njk")
      .filter(item => item.data.layout === "layouts/article.njk")
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });

  eleventyConfig.addCollection("suttas", function(api) {
    return api.getFilteredByGlob("suttas/*.njk")
      .filter(item => item.data.layout === "layouts/article.njk")
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });

  eleventyConfig.addCollection("quotes", function(api) {
    return api.getFilteredByGlob("quotes/*.njk")
      .filter(item => item.data.layout === "layouts/article.njk")
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });

  eleventyConfig.addCollection("searchable", function(api) {
    return ["concepts", "suttas", "quotes"].flatMap(function(section) {
      return api.getFilteredByGlob(section + "/*.njk")
        .filter(function(item) {
          return item.data.layout === "layouts/article.njk";
        });
    });
  });

  eleventyConfig.addFilter("stripHtml", function(value) {
    if (!value) return "";
    return String(value)
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  });

  eleventyConfig.addFilter("collectionPrev", function(collection, url) {
    if (!collection || !collection.length) return null;
    var i = collection.findIndex(function(item) { return item.url === url; });
    return i > 0 ? collection[i - 1] : null;
  });

  eleventyConfig.addFilter("collectionNext", function(collection, url) {
    if (!collection || !collection.length) return null;
    var i = collection.findIndex(function(item) { return item.url === url; });
    return i >= 0 && i < collection.length - 1 ? collection[i + 1] : null;
  });

  eleventyConfig.addFilter("excludeUrls", function(links, urls) {
    if (!links || !links.length) return [];
    var blocked = (urls || []).filter(Boolean);
    if (!blocked.length) return links;
    return links.filter(function(link) {
      return blocked.indexOf(link.url) === -1;
    });
  });

  eleventyConfig.addFilter("dateToRfc3339", function(date) {
    if (!date) return new Date().toISOString();
    var d = date instanceof Date ? date : new Date(date);
    return d.toISOString();
  });

  eleventyConfig.addFilter("getNewestCollectionItemDate", function(collection) {
    if (!collection || !collection.length) return new Date();
    return collection.reduce(function(latest, item) {
      var d = item.date instanceof Date ? item.date : new Date(item.date);
      return d > latest ? d : latest;
    }, new Date(0));
  });

  eleventyConfig.addFilter("slugify", function(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  });

  eleventyConfig.addFilter("absoluteUrl", function(path, base) {
    if (!path) return base || "";
    if (/^https?:\/\//i.test(path)) return path;
    var root = String(base || "").replace(/\/$/, "");
    var rel = String(path).startsWith("/") ? path : "/" + path;
    return root + rel;
  });

  eleventyConfig.addFilter("guideSteps", function(stages) {
    if (!stages || !stages.length) return [];
    var steps = [];
    stages.forEach(function(stage) {
      (stage.items || []).forEach(function(item) {
        if (item.planned || !item.url) return;
        steps.push({
          title: item.title,
          url: item.url,
          meta: item.meta || null,
        });
      });
    });
    return steps;
  });

  eleventyConfig.addFilter("guidePayload", function(stages) {
    var steps = eleventyConfig.getFilter("guideSteps")(stages);
    return { steps: steps, total: steps.length };
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
