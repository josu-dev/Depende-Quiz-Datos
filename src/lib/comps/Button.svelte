<script lang="ts">
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";

  type $$Props = {
    effect?: "3d" | "blade" | "none";
    class?: string;
    onClick?: () => void;
    href?: string;
  } & HTMLButtonAttributes &
    HTMLAnchorAttributes;

  let className: string = "";
  export { className as class };
  export let effect: $$Props["effect"] = "none";
  export let onClick: $$Props["onClick"] = undefined;
  export let href: $$Props["href"] = undefined;
  const type = href ? "a" : "button";
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
  this={type}
  {href}
  on:click={onClick}
  class="this btn {className}"
  class:effect-3d={effect === "3d"}
  class:effect-blade={effect === "blade"}
  {...$$restProps}
  style="
  --border-width: var(--border, 2px);
  border: var(--border-width) solid var(--border-color, currentColor);
  "
>
  <slot />
</svelte:element>

<style lang="postcss">
  .this[disabled] {
    opacity: 0.8;
    background-color: color-mix(in srgb, currentColor 20%, transparent);
    cursor: not-allowed;
  }

  .effect-3d {
    @apply relative;
  }
  .effect-3d::before {
    --delta: 2px;
    content: "";
    width: calc(100% + calc(var(--delta) * 2));
    height: calc(100% + calc(var(--delta) * 2));
    left: calc(var(--delta) * -1);
    bottom: calc(var(--delta) * -1);
    @apply absolute opacity-50 rounded;
    border: var(--border-width) solid var(--border-color, currentColor);
  }
  .effect-3d,
  .effect-3d::before {
    @apply transition-all duration-300;
  }
  .effect-3d:hover {
    opacity: 1;
    translate: 4px -4px;
  }
  .effect-3d:hover::before {
    opacity: 0.25;
    translate: -8px 8px;
  }

  @keyframes swipe {
    0% {
      left: -100%;
    }
    40% {
      left: 160%;
    }
    100% {
      left: 160%;
    }
  }
  .effect-blade {
    @apply relative overflow-hidden transition-shadow duration-300;
  }
  .effect-blade:hover {
    box-shadow: 1px 1px 25px 10px hsla(currentColor, 0.1);
  }
  .effect-blade::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -100%;
    width: 20%;
    height: 200%;
    transform: skew(-45deg);
    background: linear-gradient(120deg, transparent, rgb(255, 255, 255));
  }
  .effect-blade:hover::before {
    animation: swipe 2.5s ease infinite;
  }
</style>
