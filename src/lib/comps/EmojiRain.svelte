<script lang="ts">
  import type { CounterStore } from "$lib/stores.js";
  import { onMount } from "svelte";

  export let counter: CounterStore;

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
      emoji.y += 0.5 * emoji.z;
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
    for (let i = 0; i < new_length; i++) {
      new_emojis[i] = {
        character:
          state === "INCREMENTED" ? characters.correct : state === "EQUAL" ? characters.unknown : characters.bad,
        x: Math.random() * 100,
        y: Math.random() * -10,
        z: 0.1 + Math.random() * 1,
      };
      for (let j = i; j > 0; j--) {
        if (new_emojis[j].z < new_emojis[j - 1].z) {
          const temp = new_emojis[j];
          new_emojis[j] = new_emojis[j - 1];
          new_emojis[j - 1] = temp;
        }
      }
    }
    emojis = new_emojis;

    // emojis = [
    //   ...emojis,
    //   ...new Array(
    //     Math.pow(
    //       2,
    //       Math.floor(
    //         (state === "RESETED" ? counter.getLastValue() : $counter.value) /
    //           EMOJI_DUPLICATION_STEP
    //       )
    //     )
    //   )
    //     .fill(null)
    //     .map((_) => {
    //       return {
    //         character:
    //           state === "INCREMENTED"
    //             ? characters.correct
    //             : state === "EQUAL"
    //             ? characters.unknown
    //             : characters.bad,
    //         x: Math.random() * 100,
    //         y: Math.random() * -10,
    //         r: 0.1 + Math.random() * 1,
    //       };
    //     })
    //     .sort((a, b) => a.r - b.r),
    // ];
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
