<script lang="ts">
  import type { CounterStore } from "$lib/stores.js";
  import { onMount } from "svelte";

  export let counter: CounterStore;

  const EMOJI_DROP_FACTOR = 0.4;
  const EMOJI_DUPLICATION_STEP = 2;

  type Emoji = {
    character: string;
    x: number;
    y: number;
    z: number;
  };

  const characters = {
    correct: "😎",
    bad: "😰",
    unknown: "🤔",
  };

  let emojis: Emoji[] = [];
  let frame: number = -1;

  function loop() {
    const new_emojis = [];
    for (const emoji of emojis) {
      emoji.y += EMOJI_DROP_FACTOR * emoji.z;
      if (emoji.y > 110) {
        continue;
      }
      new_emojis.push(emoji);
    }

    emojis = new_emojis;

    if (emojis.length === 0) {
      return;
    }

    frame = requestAnimationFrame(loop);
  }

  function startLoop() {
    const state = counter.getState();
    const new_length =
      emojis.length +
      Math.pow(2, Math.floor((state === "RESETED" ? counter.getLastValue() : $counter.value) / EMOJI_DUPLICATION_STEP));

    const new_emojis: Emoji[] = new Array(new_length);

    for (let i = 0; i < emojis.length; i++) {
      new_emojis[i] = emojis[i];
    }

    for (let i = emojis.length; i < new_length; i++) {
      new_emojis[i] = {
        character:
          state === "INCREMENTED" ? characters.correct : state === "RESETED" ? characters.bad : characters.unknown,
        x: 2 + Math.random() * 96,
        y: Math.random() * -10,
        z: 0.1 + Math.random() * 0.9,
      };
    }

    for (let i = 0; i < new_emojis.length; i++) {
      for (let j = i + 1; j < new_emojis.length; j++) {
        if (new_emojis[i].z < new_emojis[j].z) {
          const temp = new_emojis[i];
          new_emojis[i] = new_emojis[j];
          new_emojis[j] = temp;
        }
      }
    }

    emojis = new_emojis;
    cancelAnimationFrame(frame);
    loop();
  }

  onMount(() => {
    const unsubscribe = counter.subscribe(() => startLoop());

    return () => {
      unsubscribe();
      frame && cancelAnimationFrame(frame);
    };
  });
</script>

<div>
  {#each emojis as emoji}
    <span style="left: {emoji.x}%; top: {emoji.y}%; transform: scale({emoji.z});opacity:{emoji.z + 0.25}"
      >{emoji.character}</span
    >
  {/each}
</div>

<style>
  div {
    position: absolute;
    inset: 0;
    overflow: hidden;
    margin: 0;
    z-index: -1;
  }

  span {
    position: absolute;
    font-size: clamp(4px, 5vw, 2rem);
    user-select: none;
  }
</style>
