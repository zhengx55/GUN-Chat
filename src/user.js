import GUN from "gun";
import "gun/sea";
import "gun/axe";
import { writable } from "svelte/store";

export const db = GUN();

// GUN User
export const user = db.user().recall({ sessionStorage: true });

// current User's username
export const username = writable("");

user.get("alias").on((v) => username.set(v));

db.on("auth", async () => {
  const alias = await user.get("alias");
  username.set(alias);
  console.log(`signed in as ${alias}`);
});
