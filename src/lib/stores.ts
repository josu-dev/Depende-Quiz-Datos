import { writable } from 'svelte/store';

const is_browser = typeof window !== 'undefined';

export function createCounterStore(initial: number = 0, max: number = Number.MAX_VALUE) {
  type State = {
    value: number;
    state: '' | 'RESETED' | 'EQUAL' | 'INCREMENTED';
  };
  let _state: State = {
    value: initial,
    state: ''
  };
  const { subscribe, set } = writable(_state);
  let _last_value = 0;

  function _set(value: State) {
    _last_value = _state.value;
    if (value.value > _state.value) {
      _state.state = 'INCREMENTED';
      _state.value = value.value > max ? max : value.value;
    }
    else if (value.value === _state.value) {
      _state.state = 'EQUAL';
    }
    else {
      _state.state = 'RESETED';
      _state.value = 0;
    }

    set(_state);
  }



  return {
    subscribe,
    set: _set,
    getState() {
      return _state.state;
    },
    getLastValue() {
      return _last_value;
    },
    increment() {
      _set({ value: _state.value + 1, state: '' });
    },
    reset() {
      _set({ value: -1, state: '' });
    }
  };
}

export type CounterStore = ReturnType<typeof createCounterStore>;

export function createChoiceStore<T>(choices: T[], initialIdx: number = 0) {
  const { subscribe, set } = writable(choices[initialIdx]);

  let current_idx = initialIdx;

  function next() {
    current_idx = (current_idx + 1) % choices.length;
    set(choices[current_idx]);
  }

  function prev() {
    current_idx = (current_idx - 1 + choices.length) % choices.length;
    set(choices[current_idx]);
  }

  return {
    subscribe,
    next,
    prev,
  };
}

export type ChoiceStore<T> = ReturnType<typeof createChoiceStore<T>>;

export function createLocalStorageStore<T>(key: string, initial: T | ((browser: boolean) => T)) {
  // @ts-expect-error
  const fallback: T = typeof initial === 'function' ? initial(is_browser) : initial;

  if (!is_browser) {
    return writable(fallback);
  }

  function parse_value<T>(value: string | null, fallback: T): T {
    if (value === null) {
      return fallback;
    }

    try {
      return JSON.parse(value);
    }
    catch (exc) {
      console.error(`Failed to parse value from localStorage: `, exc);
      return fallback;
    }
  }

  function save_value<T>(key: string, value: T) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    }
    catch (exc) {
      console.error(`Failed to save value to localStorage: `, exc);
    }
  }

  const { subscribe, set } = writable<T>(
    parse_value(localStorage.getItem(key), fallback)
  );

  return {
    subscribe,
    set: (value: T) => {
      save_value(key, value);
      return set(value);
    }
  };
};
