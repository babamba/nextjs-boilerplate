const fs = require("fs");
const globby = require("globby");
const prettier = require("prettier");

const getDate = new Date().toISOString();
const CHANGE_FREQ = "daily";

const DOMAIN = "YOUR_DOMAIN";
const formatted = sitemap => prettier.format(sitemap, { parser: "html" });

(async () => {
    const pages = await globby([
    // include
    "../src/pages/**/*.js",
    "../src/pages/*.js",

    // exclude
    "!../src/pages/_*.js",
    "!../src/pages/[*].js",
    "!../src/pages/**/[*].js"
  ]);

const pagesSitemap = `
  ${pages
    .map(page => {
      const path = page
      .replace("../src/pages/", "")
      .replace(".js", "")
      .replace(/\/index/g, "");
      const routePath = (path === "index") ? "" : path;
      return `
        <url>
        <loc>${DOMAIN}/${routePath}</loc>
        <lastmod>${getDate}</lastmod>
        <changefreq>${CHANGE_FREQ}</changefreq>
        <priority>0.5</priority>
        </url>
      `;
    })
    .join("")}
  `;

  const generatedSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${pagesSitemap}
    </urlset>
  `;

  const formattedSitemap = [formatted(generatedSitemap)];

  fs.writeFileSync("../public/sitemap.xml", formattedSitemap, "utf8");
})();