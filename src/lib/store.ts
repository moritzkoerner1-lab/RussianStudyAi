"use client";

import { classifyLocal } from "./classify";
import type { DrillProgress, NotebookEntry, Profile } from "./types";

export { classifyLocal };

const PROFILE_KEY = "vzhivuyu.profile.v1";
const NOTES_KEY = "vzhivuyu.notes.v1";
const DRILL_KEY = "vzhivuyu.drill.v1";
const PATH_KEY = "vzhivuyu.path.v1";

export const defaultProfile = (): Profile => {
  const today = new Date();
  const land = new Date(today);
  land.setDate(land.getDate() + 14);
  return {
    name: "",
    genderPast: "был",
    tutor: "ara",
    helpLang: "en",
    landOn: land.toISOString().slice(0, 10),
    startedOn: today.toISOString().slice(0, 10),
  };
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return { ...(fallback as object), ...JSON.parse(raw) } as T;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadProfile(): Profile {
  return read(PROFILE_KEY, defaultProfile());
}

export function saveProfile(profile: Profile) {
  write(PROFILE_KEY, profile);
}

export function loadNotes(): NotebookEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(NOTES_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveNotes(notes: NotebookEntry[]) {
  write(NOTES_KEY, notes);
}

export function addNote(partial: Omit<NotebookEntry, "id" | "createdAt">): NotebookEntry {
  const notes = loadNotes();
  const entry: NotebookEntry = {
    ...partial,
    id: `n_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: Date.now(),
  };
  saveNotes([entry, ...notes]);
  return entry;
}

export function removeNote(id: string) {
  saveNotes(loadNotes().filter((n) => n.id !== id));
}

export function loadDrill(): DrillProgress {
  return read(DRILL_KEY, { seen: {}, correct: {}, lastSeen: {} });
}

export function saveDrill(progress: DrillProgress) {
  write(DRILL_KEY, progress);
}

export function loadPathDone(): number[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(PATH_KEY) || "[]");
  } catch {
    return [];
  }
}

export function markDayDone(day: number) {
  const done = new Set(loadPathDone());
  done.add(day);
  write(PATH_KEY, [...done].sort((a, b) => a - b));
}
