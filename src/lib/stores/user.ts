import { browser } from "$app/environment";
import { get, writable, type Writable } from "svelte/store";

export const tokenStore: Writable<string | undefined> = writable(undefined);

export function getToken(): string | undefined {
  if (!browser) return undefined;
  let token = get(tokenStore);
  if (!token) {
    token = localStorage.getItem("token") ?? undefined;
    tokenStore.set(token);
  }
  return token;
}

export function saveToken(token: string) {
  tokenStore.set(token);
  if (!browser) return;
  localStorage.setItem("token", token);
}
