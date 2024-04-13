<script lang="ts">
  export let index: string;
  export let text: string;
  export let selected = false;
  export let onSelected: (
    index: string,
    e: MouseEvent & {
      currentTarget: EventTarget & HTMLButtonElement;
    }
  ) => void;

  $: styledText = text[0].toUpperCase() + text.slice(1);
</script>

<li>
  <button class="group text-start flex" data-selected={selected ? "" : undefined} on:click={(e) => onSelected(index, e)}>
    <span class="pt-0.5 font-medium w-4">{index.toUpperCase()}&nbsp;</span>
    <span class="px-2 pt-0.5 rounded group-hover:bg-primary/10 group-data-[selected]:bg-primary/20">
      {styledText}
    </span>
  </button>
</li>
