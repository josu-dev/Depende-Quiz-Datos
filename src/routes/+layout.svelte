<script lang="ts">
  import Button from "$lib/comps/Button.svelte";
  import { createLocalStorageStore } from "$lib/stores.js";
  import "../app.pcss";

  const color_theme = createLocalStorageStore<"dark" | "light">("color_theme", (browser) => {
    if (browser) {
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    return "dark";
  });

  function toggle_color_theme() {
    if ($color_theme === "dark") {
      document.documentElement.classList.remove("dark");
      color_theme.set("light");
    } else {
      document.documentElement.classList.add("dark");
      color_theme.set("dark");
    }
  }
</script>

<svelte:head>
  <script>
    if (typeof theme === "undefined") {
      let theme =
        localStorage.getItem("color_theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? '"dark"' : '"light"');
      switch (theme) {
        case '"dark"':
          document.documentElement.classList.add("dark");
          break;
        case '"light"':
          document.documentElement.classList.remove("dark");
          break;
      }
    }
  </script>
</svelte:head>

<div class="max-w-screen-xl min-h-full mx-auto w-full px-1 sm:px-4 lg:px-8 flex flex-col">
  <slot />

  <footer class="flex flex-col justify-center p-2">
    <div class="mx-auto">
      <Button
        onClick={toggle_color_theme}
        effect="blade"
        class="text-sm inline-flex gap-2 [&_svg]:size-5 btn-sm text-primary-muted hover:text-primary"
        title={$color_theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      >
        {#if $color_theme === "dark"}
          Tema <span class="sr-only">oscuro</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-moon fill-white/25 rounded-full"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg
          >
        {:else}
          Tema <span class="sr-only">claro</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-sun fill-yellow-500 rounded-full"
            ><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path
              d="m4.93 4.93 1.41 1.41"
            /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path
              d="m6.34 17.66-1.41 1.41"
            /><path d="m19.07 4.93-1.41 1.41" /></svg
          >
        {/if}
      </Button>
    </div>
  </footer>
</div>
