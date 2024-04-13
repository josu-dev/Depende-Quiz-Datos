<script lang="ts">
  import Button from "$lib/comps/Button.svelte";
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

<EmojiRain counter={emojiCounter} />

<PageMain class="relative justify-center">
  <h1 class="sr-only">Depende Quiz Version Datos</h1>
  {#if !isPlaying}
    <div in:blur class="flex flex-col items-center">
      <h2 class="text-4xl text-pretty text-center text-accent font-semibold">
        Si sabes mandale mecha,<br />sino, tambien <span class="inline-block hover:animate-shake">😶‍🌫️</span>
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
    <div in:scale class="flex flex-col items-center gap-2">
      <MultipleChoice
        name={currentChoiceName}
        choice={currentChoiceStore}
        onBadAnswer={() => emojiCounter.reset()}
        onGoodAnswer={() => emojiCounter.increment()}
        onNoAnswer={() => emojiCounter.set($emojiCounter)}
        onSkip={() => {}}
      />
    </div>
    <div class="absolute bottom-0 right-0">
      <Button onClick={handleGotoStart} effect="3d" class="text-primary-muted hover:text-primary">Inicio</Button>
    </div>
  {/if}
</PageMain>
