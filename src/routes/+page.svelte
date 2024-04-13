<script lang="ts">
  import Button from "$lib/comps/Button.svelte";
  import Disclaimer from "$lib/comps/Disclaimer.svelte";
  import EmojiRain from "$lib/comps/EmojiRain.svelte";
  import MultipleChoice from "$lib/comps/MultipleChoice.svelte";
  import PageMain from "$lib/comps/PageMain.svelte";
  import Seo from "$lib/comps/SEO.svelte";
  import DBDMultipleChoices from "$lib/content/dbd_multiple_choices.json";
  import FODMultipleChoices from "$lib/content/fod_multiple_choices.json";
  import { createChoiceStore, createCounterStore, type ChoiceStore } from "$lib/stores.js";
  import { shuffle } from "$lib/utils.js";
  import { blur, scale } from "svelte/transition";

  let isPlaying = false;

  const emojiCounter = createCounterStore(0, 32);

  const choiceFOD = createChoiceStore(shuffle(FODMultipleChoices));
  const choiceDBD = createChoiceStore(shuffle(DBDMultipleChoices));

  let currentChoiceName = "";
  let currentChoiceStore = choiceFOD;

  function startMultipleChoice(name: string, choice: ChoiceStore<any>) {
    currentChoiceName = name;
    currentChoiceStore = choice;
    isPlaying = true;
  }

  function handleGotoStart() {
    isPlaying = false;
    emojiCounter.reset();
  }
</script>

<Seo
  seo={{
    description:
      "Pon a prueba tus conocimientos sobre 'Fundamentos de Organizacion de Datos' y 'Diseño de Base de Datos' con un quiz que te pondra a pensar y repensar lo que pensabas que sabias.",
  }}
/>

<Disclaimer />

<EmojiRain counter={emojiCounter} />

<PageMain class="relative justify-center">
  <h1 class="sr-only">Depende Quiz Version Datos</h1>
  {#if !isPlaying}
    <div in:blur class="flex flex-col items-center">
      <h2 class="text-4xl text-pretty text-center text-accent font-semibold">
        Si sabes mandale mecha,<br />sino, tambien <span class="inline-block hover:animate-shake select-none">😶‍🌫️</span>
      </h2>
      <div class="flex flex-col gap-2 mt-6 lg:mt-8">
        <Button
          onClick={() => startMultipleChoice("Org. de Datos", choiceFOD)}
          effect="3d"
          class="text-primary-muted hover:text-primary"
        >
          Organizacion de Datos
        </Button>
        <span class="font-semibold mx-auto text-primary-muted">o</span>
        <Button
          onClick={() => startMultipleChoice("Base de Datos", choiceDBD)}
          effect="3d"
          class="text-primary-muted hover:text-primary"
        >
          Diseño de Base de Datos
        </Button>
      </div>
    </div>
  {:else}
    <div class="flex-1 flex flex-col">
      <div in:scale class="flex flex-col items-center gap-2 overflow-hidden my-auto">
        <MultipleChoice
          name={currentChoiceName}
          choice={currentChoiceStore}
          onBadAnswer={() => emojiCounter.reset()}
          onGoodAnswer={() => emojiCounter.increment()}
          onNoAnswer={() => emojiCounter.set($emojiCounter)}
          onSkip={() => {}}
        />
      </div>
      <div class="self-end">
        <Button onClick={handleGotoStart} effect="3d" class="text-primary-muted hover:text-primary mt-2">Inicio</Button>
      </div>
    </div>
  {/if}
</PageMain>
