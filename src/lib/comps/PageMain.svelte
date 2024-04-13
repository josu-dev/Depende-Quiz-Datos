<script lang="ts">
  let className = "";
  export { className as class };
</script>

<main class="flex-1 flex flex-col {className}">
  <slot />
</main>
