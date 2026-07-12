function stripHtml(value) {
  if (!value) return "";
  return String(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

module.exports = class {
  data() {
    return {
      permalink: "/search-index.json",
      eleventyExcludeFromCollections: true,
    };
  }

  render({ collections }) {
    const items = collections.searchable.map(function (item) {
      return {
        title: item.data.title,
        url: item.url,
        section: item.data.section,
        excerpt: item.data.excerpt || "",
        text: stripHtml(item.templateContent),
      };
    });
    return JSON.stringify(items);
  }
};
