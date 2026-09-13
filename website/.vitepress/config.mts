import { defineConfig } from "vitepress";

// The apex domain 308-redirects to www, so www is the canonical host.
const hostname = "https://www.morando.dev";
const ogImage = `${hostname}/og-image.png`;
const siteDescription = "Architecture Linter For Front-End Applications";

// WIP pages, intentionally kept out of search results.
const excludedFromSitemap = ["/templates/"];

/**
 * Maps a source path to the URL actually served in production.
 * The site is deployed without clean URLs, so pages keep their .html extension.
 */
const toSitePath = (relativePath: string): string => {
  const withoutExtension = relativePath.replace(/\.md$/, "");
  return withoutExtension === "index" ? "/" : `/${withoutExtension}.html`;
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",
  lang: "en-US",
  title: "Morando",
  description: siteDescription,
  head: [
    ["link", { rel: "icon", href: "/favicon.svg" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: "Morando" }],
    ["meta", { property: "og:locale", content: "en_US" }],
    ["meta", { property: "og:image", content: ogImage }],
    ["meta", { property: "og:image:width", content: "1200" }],
    ["meta", { property: "og:image:height", content: "630" }],
    [
      "meta",
      {
        property: "og:image:alt",
        content: "Morando, an architecture linter for front-end applications",
      },
    ],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:image", content: ogImage }],
  ],
  sitemap: {
    hostname,
    transformItems: (items) =>
      items.filter((item) => {
        const path = item.url.startsWith("/") ? item.url : `/${item.url}`;
        return !excludedFromSitemap.some((excluded) =>
          path.startsWith(excluded),
        );
      }),
  },
  transformPageData: (pageData) => {
    const url = `${hostname}${toSitePath(pageData.relativePath)}`;
    const title = pageData.frontmatter.title ?? pageData.title ?? "Morando";
    const description = pageData.frontmatter.description ?? siteDescription;

    pageData.frontmatter.head ??= [];
    pageData.frontmatter.head.push(
      ["link", { rel: "canonical", href: url }],
      ["meta", { property: "og:url", content: url }],
      ["meta", { property: "og:title", content: title }],
      ["meta", { property: "og:description", content: description }],
      ["meta", { name: "twitter:title", content: title }],
      ["meta", { name: "twitter:description", content: description }],
    );
  },
  themeConfig: {
    sidebar: [
      {
        text: "What is Morando?",
        link: "/",
      },
      {
        text: "Modules",
        link: "/modules",
      },
      {
        text: "Domains",
        link: "/domains",
      },
      {
        text: "Layers",
        link: "/layers",
      },
      {
        text: "Layer Groups",
        link: "/layer-groups",
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/pwlmc/morando" }],
  },
});
