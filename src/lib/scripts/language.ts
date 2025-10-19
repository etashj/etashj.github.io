import { writable } from 'svelte/store';

// 1. Create a writable store with an initial boolean value 'false'.
// The 'isToggled' constant will hold the store itself.
export const isHindi = writable<boolean>(false);

// 2. Create a function to toggle the boolean value in the store.
// The update method takes a callback which receives the current value
// and returns the new value.
export function toggleHindi() {
  isHindi.update(currentValue => !currentValue);
}