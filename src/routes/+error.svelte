<script lang="ts">
  import { page } from "$app/stores";
  import Button from "$lib/comps/Button.svelte";
  import PageMain from "$lib/comps/PageMain.svelte";
  import Seo from "$lib/comps/SEO.svelte";

  $: is400 = $page.status >= 400 && $page.status < 500;
  $: is404 = $page.status === 404;
  $: is500 = $page.status >= 500;

  $: pageUrl = $page.url.host + $page.url.pathname;
</script>

<Seo
  seo={{
    title: `Error ${$page.status}`,
    description: is400
      ? is404
        ? `No existe la pagina '${pageUrl}'`
        : "Error en la solicitud realizada, intente de nuevo"
      : is500
        ? "Error por parte del servidor al procesar la solicitud"
        : "Error desconocido al procesar la solicitud",
  }}
/>

<PageMain class="relative justify-center">
  <h1 class="text-6xl text-pretty text-center text-accent font-bold">
    <span class="sr-only">Error </span>{$page.status}
  </h1>
  <h2 class="text-2xl text-pretty text-center text-primary mt-[0.75em]">
    {#if is400}
      {#if is404}
        No existe la pagina <span
          class="px-1.5 leading-loose break-words rounded ring-2 ring-current bg-[color-mix(in_srgb,currentColor_10%,transparent)]"
          >'{pageUrl}'</span
        >
      {:else}
        Error en la solicitud realizada
      {/if}
    {:else if is500}
      Error por parte del servidor
    {:else}
      Error desconocido
    {/if}
  </h2>
  <div class="flex flex-col mt-16">
    <p class="text-lg text-primary-muted mt-[0.75em] text-center">
      Puedes regresar a la
      <Button href="/" effect="3d" class="inline-block btn-sm hover:text-primary">pagina principal</Button>
    </p>
  </div>
</PageMain>
