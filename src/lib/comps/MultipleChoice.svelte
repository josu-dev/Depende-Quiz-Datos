<script lang="ts">
  import type { ChoiceStore } from "$lib/stores.js";
  import Button from "./Button.svelte";
  import ChoiceContent from "./ChoiceContent.svelte";

  type Choice = {
    sentence: string;
    options: string[][];
    answers: string[];
    verified?: boolean;
  };

  export let name: string;
  export let choice: ChoiceStore<Choice>;
  export let onBadAnswer: () => void;
  export let onGoodAnswer: () => void;
  export let onNoAnswer: () => void;
  export let onSkip: () => void;

  choice.next();
  $: _choice = $choice;
  let choiceCount = 0;
  let selected = "";
  let showAnswers = false;
  let answered = false;

  function newChoice() {
    selected = "";
    showAnswers = false;
    answered = false;
    choice.next();
    choiceCount++;
  }

  function lastChoice() {
    selected = "";
    showAnswers = false;
    answered = false;
    choice.prev();
    choiceCount--;
  }

  function validateAnswer() {
    if (answered) {
      return;
    }

    answered = true;
    showAnswers = true;
    if (selected === "") {
      onSkip();
      return;
    }

    if (_choice.options.length === 0) {
      // $emojiCount = $emojiCount;
      onNoAnswer();
      return;
    }

    const possibleAnswers = _choice.answers.map((answer) => answer.toLocaleLowerCase());
    const existAnswers = possibleAnswers
      .map((answer) => {
        const optionIndex = _choice.options.findIndex(
          (option) => option.filter((value) => value.toLowerCase() === answer).length > 0
        );
        return optionIndex;
      })
      .filter((index) => index !== -1);
    if (existAnswers.length === 0) {
      // $emojiCount = $emojiCount;
      onNoAnswer();
      return;
    }

    const userAnswerIndex = _choice.options.findIndex((option) => option[0].toLowerCase() === selected.toLowerCase());
    if (existAnswers.findIndex((index) => index === userAnswerIndex) === -1) {
      //emojiCount.reset();
      onBadAnswer();
      return;
    }

    //$emojiCount += 1;
    onGoodAnswer();
  }
</script>

<h2 class="text-4xl text-pretty text-center text-accent font-semibold">
  Quiz: {name ? ` '${name}'` : ""}
</h2>
<ChoiceContent
  {..._choice}
  {selected}
  {showAnswers}
  onSelected={(index) => {
    if (answered) {
      return;
    }
    selected = index;
  }}
/>
<div class="flex gap-2 mt-4 sm:mt-4 sm:gap-4">
  <Button
    onClick={lastChoice}
    effect="blade"
    disabled={choiceCount === 0}
    class="text-primary-muted hover:text-primary"
  >
    Anterior
  </Button>
  <Button onClick={validateAnswer} effect="blade" class="text-primary-muted hover:text-primary">Ver respuesta</Button>
  <Button onClick={newChoice} effect="blade" class="text-primary-muted hover:text-primary">Siguiente</Button>
</div>
