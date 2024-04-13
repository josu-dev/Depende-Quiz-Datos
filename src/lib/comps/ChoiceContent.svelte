<script lang="ts">
  import { fly, slide } from "svelte/transition";
  import ChoiceOption from "./ChoiceOption.svelte";

  export let sentence: string;
  export let options: string[][];
  export let answers: string[];
  export let verified: boolean | undefined = false;
  export let selected = "";
  export let showAnswers = false;
  export let onSelected: (index: string) => void;

  function firstLetterUpperCase(text: string): string {
    if (!text) {
      return text;
    }

    let index = 0;
    while (
      index < text.length - 1 &&
      (text[index] < "A" || (text[index] > "Z" && text[index] < "a") || text[index] > "z")
    ) {
      index++;
    }

    return text.slice(0, index) + text[index].toUpperCase() + text.slice(index + 1);
  }

  function handleSelection(index: string) {
    onSelected(index);
  }

  $: if (!showAnswers) {
    selected = "";
  }
</script>

<div class="text-primary-muted max-w-screen-md">
  {#key sentence}
    <div in:fly={{ x: 100 }} class="flex flex-col px-4">
      <h3 class="text-lg font-medium text-primary mt-[0.75em]">{sentence}</h3>
      <ul class="ml-1 space-y-0.5 mt-1 text-balance">
        {#each options as option}
          <ChoiceOption
            index={option[0]}
            text={option[1]}
            selected={selected === option[0]}
            onSelected={handleSelection}
          />
        {/each}
      </ul>
      {#if showAnswers}
        <div class="container" in:slide>
          <h4 class="text-lg font-medium text-primary mt-[0.75em]">
            {answers.length > 1
              ? `Respuestas${verified ? " (verificadas)" : ""}`
              : `Respuesta${verified ? " (verificada)" : ""}`}
          </h4>
          <ul class="ml-1 mt-1 font-medium flex space-x-4">
            {#each answers as answer}
              <li class="underline underline-offset-2 decoration-primary-muted/50">{firstLetterUpperCase(answer)}</li>
            {:else}
              <li>No disponible</li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>
  {/key}
</div>
