<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import { DEFAULT_SEO } from "$lib/constants.js";

  type Props = {
    /**
     * Specifies the preferred version of the page when multiple versions are available.
     * @default 'current'
     */
    canonical?: "current" | (string & {});
    /**
     * Defines the character encoding for the page.
     * @default 'utf-8'
     */
    charset?: string;
    /**
     * Provides a concise explanation of the page's content.
     */
    description: string;
    /**
     * Specifies a icon for the page.
     */
    icon?: string;
    /**
     * Defines the language and geographical region the page is intended for.
     */
    locale?: `${string}_${string}`;
    /**
     * Contains specific properties for pages of type 'article' in Open Graph protocol.
     */
    og_article?: {
      /**
       * Indicates when the article was first published.
       */
      published_time: string;
      /**
       * Indicates when the article was last changed.
       */
      modified_time?: string;
      /**
       * Indicates when the article is out of date after.
       */
      expiration_time?: string;
      /**
       * Lists the authors of the article.
       */
      authors: string[];
      /**
       * Categorizes the article into a section.
       */
      section?: string;
      /**
       * Tags that describe the topic of the article.
       */
      tags?: string[];
    };
    /**
     * Describes the page for Open Graph protocol.
     */
    og_description?: string;
    /**
     * Specifies the word that appears before the page's title in Open Graph protocol.
     */
    og_determiner?: string;
    /**
     * Defines the image that represents the page in Open Graph protocol.
     */
    og_image?: {
      url: string;
      alt: string;
      width: string;
      height: string;
      type?: string;
      urlSecure?: string;
    };
    /**
     * Instructs web robots whether to follow links on the page.
     */
    nofollow?: boolean;
    /**
     * Instructs web robots whether to index the page.
     */
    noindex?: boolean;
    /**
     * Defines the name of the website the page belongs to.
     */
    siteName?: string;
    /**
     * Specifies the theme color for the page.
     */
    themeColor?: string;
    /**
     * Defines the title of the page.
     */
    title?: string;
    /**
     * Specifies the default title to use when none is provided.
     */
    titleDefault?: string;
    /**
     * Defines a template for generating the title of the page.
     */
    titleTemplate?: string;
    /**
     * Specifies the type of content on the page.
     *
     * If not provided, the value is inferred from the `og_article` property.
     */
    type?: "article" | "website";
    /**
     * Specifies the URL of the page.
     * @default 'current'
     */
    url?: "current" | (string & {});
  };

  export let seo: Props;

  function safe_local_url(url: string) {
    return url.startsWith("/") ? base + url : url;
  }

  const {
    canonical = "current",
    charset = "utf-8",
    description,
    icon = DEFAULT_SEO.icon,
    locale = DEFAULT_SEO.locale,
    og_article,
    og_description,
    og_determiner = "auto",
    og_image = DEFAULT_SEO.image,
    nofollow = false,
    noindex = false,
    siteName = DEFAULT_SEO.site_name,
    themeColor = DEFAULT_SEO.theme_color,
    title,
    titleDefault = DEFAULT_SEO.title_default,
    titleTemplate = DEFAULT_SEO.title_template,
    type,
    url = "current",
  }: Props = seo;

  const title_to_render = title ? (titleTemplate ? titleTemplate.replace("%s", title) : title) : titleDefault;
  const robots = `${noindex ? "noindex" : "index"}, ${nofollow ? "nofollow" : "follow"}`;

  let currentUrl = $page.url.origin + ($page.url.pathname === "/" ? "" : $page.url.pathname);
</script>

<svelte:head>
  <meta {charset} />
  <title>{title_to_render}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical === "current" ? currentUrl : canonical} />
  <link rel="icon" href={safe_local_url(icon)} />
  <meta name="robots" content={robots} />
  <meta name="generator" content="SvelteKit" />
  {#if themeColor}
    <meta name="theme-color" content={themeColor} />
  {/if}
  <meta property="og:site_name" content={siteName} />
  <meta property="og:title" content={title_to_render} />
  <meta property="og:type" content={type || (og_article ? "article" : "website")} />
  <meta property="og:url" content={url === "current" ? currentUrl : url} />
  <meta property="og:description" content={og_description ?? description} />
  <meta property="og:locale" content={locale} />
  {#if og_image}
    <meta property="og:image" content={safe_local_url(og_image.url)} />
    {#if og_image.urlSecure}
      <meta property="og:image:secure_url" content={safe_local_url(og_image.urlSecure)} />
    {/if}
    <meta property="og:image:alt" content={og_image.alt} />
    <meta property="og:image:width" content={og_image.width} />
    <meta property="og:image:height" content={og_image.height} />
    {#if og_image.type}
      <meta property="og:image:type" content={og_image.type} />
    {/if}
  {/if}
  {#if og_determiner}
    <meta property="og:determiner" content={og_determiner} />
  {/if}
  {#if og_article}
    <meta property="article:published_time" content={og_article.published_time} />
    {#if og_article.modified_time}
      <meta property="article:modified_time" content={og_article.modified_time} />
    {/if}
    {#if og_article.expiration_time}
      <meta property="article:expiration_time" content={og_article.expiration_time} />
    {/if}
    {#if og_article.authors}
      {#each og_article.authors as author}
        <meta property="article:author" content={author} />
      {/each}
    {/if}
    {#if og_article.section}
      <meta property="article:section" content={og_article.section} />
    {/if}
    {#if og_article.tags}
      {#each og_article.tags as tag}
        <meta property="article:tag" content={tag} />
      {/each}
    {/if}
  {/if}
  <slot />
</svelte:head>
