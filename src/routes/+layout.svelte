<script lang="ts">
  import Button from "$lib/comps/Button.svelte";
  import { createLocalStorageStore } from "$lib/stores.js";
  import { onMount } from "svelte";
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

  let is_fullscreen = typeof document !== "undefined" && !!document.fullscreenElement;
  function toggle_fullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(console.error);
    } else {
      document.documentElement.requestFullscreen().catch(console.error);
    }
  }

  onMount(() => {
    function on_fullscreenchange() {
      is_fullscreen = !!document.fullscreenElement;
    }

    document.addEventListener("fullscreenchange", on_fullscreenchange);

    return () => {
      document.removeEventListener("fullscreenchange", on_fullscreenchange);
    };
  });
</script>

<svelte:head>
  <script>
    switch (
      localStorage.getItem("color_theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? '"dark"' : '"light"')
    ) {
      case '"dark"':
        document.documentElement.classList.add("dark");
        break;
      case '"light"':
        document.documentElement.classList.remove("dark");
        break;
    }
  </script>
</svelte:head>

<div class="max-w-screen-xl min-h-full mx-auto w-full px-1 sm:px-4 lg:px-8 flex flex-col">
  <slot />

  <footer class="flex flex-col justify-center p-2">
    <div class="mx-auto space-x-2">
      <Button
        onClick={toggle_color_theme}
        effect="blade"
        class="text-sm inline-flex gap-2 [&_svg]:size-5 p-1.5 text-primary-muted hover:text-primary"
        title={$color_theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      >
        <div class="hidden dark:block">
          <span class="sr-only">Cambiar a tema claro</span>
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
            class="lucide lucide-sun fill-amber-500 rounded-full"
            ><circle cx="12" cy="12" r="6" /><path d="M12 2v2" /><path d="M12 20v2" /><path
              d="m4.93 4.93 1.41 1.41"
            /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path
              d="m6.34 17.66-1.41 1.41"
            /><path d="m19.07 4.93-1.41 1.41" /></svg
          >
        </div>
        <div class="dark:hidden">
          <span class="sr-only">Cambiar a tema oscuro</span>
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
            class="lucide lucide-moon fill-neutral-100 rounded-full"
            ><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg
          >
        </div>
      </Button>
      <Button
        onClick={toggle_fullscreen}
        effect="blade"
        class="text-sm inline-flex gap-2 [&_svg]:size-5 p-1.5 text-primary-muted hover:text-primary"
        title={is_fullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
      >
        {#if is_fullscreen}
          <span class="sr-only">Salir de pantalla completa</span>
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
            class="lucide lucide-minimize"
            ><path d="M8 3v3a2 2 0 0 1-2 2H3" /><path d="M21 8h-3a2 2 0 0 1-2-2V3" /><path
              d="M3 16h3a2 2 0 0 1 2 2v3"
            /><path d="M16 21v-3a2 2 0 0 1 2-2h3" /></svg
          >
        {:else}
          <span class="sr-only">Pantalla completa</span>
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
            class="lucide lucide-maximize"
            ><path d="M8 3H5a2 2 0 0 0-2 2v3" /><path d="M21 8V5a2 2 0 0 0-2-2h-3" /><path
              d="M3 16v3a2 2 0 0 0 2 2h3"
            /><path d="M16 21h3a2 2 0 0 0 2-2v-3" /></svg
          >
        {/if}
      </Button>
    </div>
  </footer>
</div>
