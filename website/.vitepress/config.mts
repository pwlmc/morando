import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",
  title: "Morando",
  description: "Architecture Linter For Front-End Applications",
  head: [["link", { rel: "icon", href: "/favicon.svg" }]],
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
