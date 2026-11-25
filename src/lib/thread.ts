"use client";

import type { HelpLang } from "./types";

export type SeeBend = {
  /** One stressed form / bend shown in the strip */
  bend: string;
  /** Spoken Russian for tap-to-hear (full line or the bend) */
  audio: string;
  /** One help-language sentence only if needed */
  gloss?: string;
};

export type ThreadTurn = {
  id: string;
  role: "user" | "ara";
  text: string;
  at: number;
  see?: SeeBend;
  /** Correction line Ara gave (right Moscow line) */
  native?: string;
  /** One short help-language tip under her line */
  help?: string;
};

const THREAD_KEY = "vzhivuyu.thread.v1";

export function loadThread(): ThreadTurn[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(THREAD_KEY) || "[]") as ThreadTurn[];
  } catch {
    return [];
  }
}

export function saveThread(turns: ThreadTurn[]) {
  if (typeof window === "undefined") return;
  // Keep a long continuous thread, but bound storage
  const trimmed = turns.slice(-200);
  localStorage.setItem(THREAD_KEY, JSON.stringify(trimmed));
}

export function appendTurn(turn: ThreadTurn): ThreadTurn[] {
  const next = [...loadThread(), turn];
  saveThread(next);
  return next;
}

export function patchLastAraSee(see: SeeBend): ThreadTurn[] {
  const turns = loadThread();
  for (let i = turns.length - 1; i >= 0; i--) {
    if (turns[i].role === "ara") {
      turns[i] = { ...turns[i], see };
      saveThread(turns);
      break;
    }
  }
  return turns;
}

export function clearThread() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(THREAD_KEY);
}

export function wantsSee(text: string): boolean {
  const t = text.trim().toLowerCase();
  return (
    /^(show me|покажи|покажите|see|see it|zeig|zeig mir)\b/i.test(t) ||
    t === "see" ||
    t === "покажи"
  );
}

export function glossFor(
  helpLang: HelpLang,
  en?: string,
  de?: string,
): string | undefined {
  if (helpLang === "de") return de || en;
  return en || de;
}
