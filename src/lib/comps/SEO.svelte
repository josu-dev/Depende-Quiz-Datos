<script lang="ts">
  import { page } from "$app/stores";
  import { DEFAULT_SEO } from "$lib/constants.js";

  type Props = {
    /**
     * The canonical URL of the page
     *
     * @default 'current'
     */
    canonical?: "current" | (string & {});
    /**
     * The charset of the page
     */
    charset?: string;
    /**
     * The description of the page
     */
    description: string;
    /**
     * The icon of the page
     */
    icon?: string;
    /**
     * The image related to the page
     */
    image?: {
      url: string;
      alt: string;
      width: string;
      height: string;
      type?: string;
      urlSecure?: string;
    };
    /**
     * The locale of the page
     */
    locale?: `${string}_${string}`;
    /**
     * Controls the robots meta tag
     */
    nofollow?: boolean;
    /**
     * Controls the robots meta tag
     */
    noindex?: boolean;
    /**
     * The name of the site
     */
    siteName?: string;
    /**
     * The theme color of the page
     */
    themeColor?: string;
    /**
     * The title of the page
     */
    title?: string;
    /**
     * The default title of the page
     */
    titleDefault?: string;
    /**
     * The title template of the page
     */
    titleTemplate?: string;
    /**
     * The type of the page
     */
    type?: "article" | "website";
    /**
     * The URL of the page
     *
     * @default 'current'
     */
    url?: "current" | (string & {});
  };

  export let seo: Props;

  const {
    canonical = "current",
    charset = "utf-8",
    description,
    icon = DEFAULT_SEO.icon,
    image = DEFAULT_SEO.image,
    locale = DEFAULT_SEO.locale,
    nofollow = false,
    noindex = false,
    siteName = DEFAULT_SEO.site_name,
    themeColor = DEFAULT_SEO.theme_color,
    title,
    titleDefault = DEFAULT_SEO.title_default,
    titleTemplate = DEFAULT_SEO.title_template,
    type = "website",
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
  <link rel="icon" href={icon} />
  <meta name="robots" content={robots} />
  <meta name="generator" content="SvelteKit" />
  {#if themeColor}
    <meta name="theme-color" content={themeColor} />
  {/if}
  <meta property="og:site_name" content={siteName} />
  <meta property="og:title" content={title_to_render} />
  <meta property="og:type" content={type} />
  <meta property="og:url" content={url === "current" ? currentUrl : url} />
  <meta property="og:description" content={description} />
  <meta property="og:locale" content={locale} />
  {#if image}
    <meta property="og:image" content={image.url} />
    {#if image.urlSecure}
      <meta property="og:image:secure_url" content={image.urlSecure} />
    {/if}
    <meta property="og:image:alt" content={image.alt} />
    <meta property="og:image:width" content={image.width} />
    <meta property="og:image:height" content={image.height} />
    {#if image.type}
      <meta property="og:image:type" content={image.type} />
    {/if}
  {/if}
  <slot />
</svelte:head>
