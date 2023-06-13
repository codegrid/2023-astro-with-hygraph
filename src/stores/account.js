import { writable } from 'svelte/store';

export const account = writable(null);
export const accountLoaded = writable(false);
