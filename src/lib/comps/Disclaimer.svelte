<script lang="ts">
  import { createLocalStorageStore } from "$lib/stores.js";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import Button from "./Button.svelte";

  function portal(node: HTMLElement) {
    const document = node.ownerDocument;
    const body = document.body;
    body.appendChild(node);
    return {
      destroy() {
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      },
    };
  }

  const disclaimerAccepted = createLocalStorageStore("disclaimer_accepted", false);

  let showDialog = false;

  onMount(() => {
    if ($disclaimerAccepted) {
      return;
    }

    const timeoutId = setTimeout(() => {
      showDialog = true;
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  });
</script>

{#if !$disclaimerAccepted && showDialog}
  <div transition:fade use:portal class="fixed inset-0 grid place-items-center bg-[rgb(5,5,5)]/75">
    <div
      class="rounded-lg text-center max-w-lg mx-2 px-2 sm:px-4 py-8 bg-[rgb(5,5,5)] shadow-md shadow-[rgb(5,5,5)]/95 transition-shadow duration-300 hover:shadow-xl hover:shadow-[rgb(5,5,5)]/95"
    >
      <h1 class="text-4xl font-bold text-neutral-50">Disclaimer</h1>
      <p class="text-balance text-lg mt-[0.75em] text-neutral-100">
        Usted utiliza esta pagina bajo su propia voluntad. El desarrollador no se hace responsable de que la informacion
        en los quiz este equivocada o desactualizada.
      </p>
      <footer class="text-transparent mt-[0.75em]">Y obviamente dono mi ALMA &lt;3</footer>
      <Button
        onClick={() => ($disclaimerAccepted = true)}
        effect="blade"
        class="mt-[0.75em] text-neutral-200 hover:text-neutral-100"
      >
        Confio ciegamente
      </Button>
    </div>
  </div>
{/if}
