import PocketBase from 'pocketbase'
import { writable } from "svelte/store";

export const pb = new PocketBase("http://127.0.0.1:8093");

export const profile = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    profile.set(pb.authStore.model);
});