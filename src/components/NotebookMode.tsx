"use client";

import { useEffect, useMemo, useState } from "react";
import { classifyLocal } from "@/lib/classify";
import {
  addNote,
  loadNotes,
  removeNote,
  saveNotes,
} from "@/lib/store";
import type { NotebookEntry, NoteKind } from "@/lib/types";

const LABELS: Record<NoteKind, string> = {
  word: "Слово",
  grammar: "Грамматика",
  usecase: "Ситуация",
  phrase: "Фраза",
};

export function NotebookMode() {
  const [notes, setNotes] = useState<NotebookEntry[]>([]);
  const [text, setText] = useState("");
  const [note, setNote] = useState("");
  const [filter, setFilter] = useState<NoteKind | "all">("all");
  const [pendingKind, setPendingKind] = useState<NoteKind>("word");

  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  useEffect(() => {
    setPendingKind(classifyLocal(text));
  }, [text]);

  const visible = useMemo(
    () => (filter === "all" ? notes : notes.filter((n) => n.kind === filter)),
    [notes, filter],
  );

  async function save() {
    const cleaned = text.trim();
    if (!cleaned) return;

    let kind = classifyLocal(cleaned);
    try {
      const res = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: cleaned }),
      });
      const data = (await res.json()) as { kind?: NoteKind };
      if (data.kind) kind = data.kind;
    } catch {
      /* local already set */
    }

    const entry = addNote({
      text: cleaned,
      note: note.trim() || undefined,
      kind,
      source: "manual",
    });
    setNotes((n) => [entry, ...n]);
    setText("");
    setNote("");
  }

  function changeKind(id: string, kind: NoteKind) {
    const next = notes.map((n) => (n.id === id ? { ...n, kind } : n));
    setNotes(next);
    saveNotes(next);
  }

  function trash(id: string) {
    removeNote(id);
    setNotes((n) => n.filter((x) => x.id !== id));
  }

  return (
    <div className="fade-up flex h-full flex-col">
      <header className="mb-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--faint)]">
          One beautiful pile
        </p>
        <h2 className="font-display text-4xl">Тетрадь</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Words, grammar, use cases — auto-sorted as you save.
        </p>
      </header>

      <div className="surface p-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="Сохраните слово, правило или фразу…"
          className="input-dark resize-none px-3 py-3"
        />
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional note"
          className="input-dark mt-2 h-11 rounded-full px-4 text-sm"
        />
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="rounded-full bg-[rgba(226,90,50,0.14)] px-3 py-1 text-xs font-semibold text-[var(--primary)]">
            {LABELS[pendingKind]}
          </span>
          <button
            type="button"
            onClick={() => void save()}
            className="pill pill-ink px-5 text-sm"
          >
            Keep
          </button>
        </div>
      </div>

      <div className="mt-4 flex gap-1 overflow-x-auto pb-1">
        {(["all", "word", "phrase", "grammar", "usecase"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setFilter(k)}
            className="pill shrink-0 text-xs font-semibold"
            style={{
              background: filter === k ? "var(--fg)" : "transparent",
              color: filter === k ? "var(--ink)" : "var(--muted)",
            }}
          >
            {k === "all" ? "All" : LABELS[k]}
          </button>
        ))}
      </div>

      <div className="mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto pb-4">
        {visible.length === 0 && (
          <p className="py-10 text-center text-sm text-[var(--faint)]">
            Empty for now. Corrections from Speak and Walk land here.
          </p>
        )}
        {visible.map((n) => (
          <article key={n.id} className="surface px-4 py-3">
            <div className="flex items-start justify-between gap-2">
              <p className="ru-line text-xl leading-snug">{n.text}</p>
              <button
                type="button"
                onClick={() => trash(n.id)}
                className="text-xs text-[var(--faint)]"
                aria-label="Delete"
              >
                ✕
              </button>
            </div>
            {n.note && (
              <p className="mt-1 text-sm text-[var(--muted)]">{n.note}</p>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {(Object.keys(LABELS) as NoteKind[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => changeKind(n.id, k)}
                  className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
                  style={{
                    background:
                      n.kind === k ? "rgba(226,90,50,0.16)" : "transparent",
                    color: n.kind === k ? "var(--primary)" : "var(--faint)",
                  }}
                >
                  {LABELS[k]}
                </button>
              ))}
              <span className="ml-auto text-[10px] uppercase tracking-wider text-[var(--faint)]">
                {n.source}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
