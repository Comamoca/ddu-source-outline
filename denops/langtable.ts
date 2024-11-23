// HACK: Need to fix this as I don't know the best way to do it.

import { is } from "../deps.ts";

export function replaceToLongName(shortName: string): string {
  const nameTable = {
    "py": "python",
    "rb": "ruby",
    "ts": "typescript",
    "js": "javascript",
  };

  const target = Object.entries(nameTable)
    .filter((p) => shortName === p[0]);

  if (target.length <= 0) {
    // Not registered in official name or polyfill
    return shortName;
  } else {
    return target[0][1];
  }
}
