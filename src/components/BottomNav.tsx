"use client";

import type { AppMode } from "@/lib/types";

const ITEMS: { id: AppMode; label: string; ru: string }[] = [
  { id: "speak", label: "Speak", ru: "Говор" },
  { id: "walk", label: "Walk", ru: "Шаг" },
  { id: "drill", label: "Drill", ru: "Строй" },
  { id: "notebook", label: "Keep", ru: "Тетр" },
  { id: "path", label: "Path", ru: "Путь" },
];

export function BottomNav({
  mode,
  onChange,
}: {
  mode: AppMode;
  onChange: (m: AppMode) => void;
}) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-xl px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="glass flex items-center justify-between rounded-full px-2 py-2 shadow-[0_10px_40px_rgba(12,18,32,0.08)]">
        <button
          type="button"
          onClick={() => onChange("home")}
          className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold tracking-widest"
          style={{ color: mode === "home" ? "var(--signal)" : "var(--ink)" }}
          aria-label="Home"
        >
          ВЖ
        </button>
        {ITEMS.map((item) => {
          const active = mode === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className="relative flex min-w-[3.4rem] flex-col items-center rounded-full px-2 py-1.5 transition-colors"
              style={{ color: active ? "var(--ink)" : "var(--muted)" }}
            >
              {active && (
                <span
                  className="absolute inset-0 -z-10 rounded-full"
                  style={{ background: "rgba(196,30,58,0.10)" }}
                />
              )}
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">
                {item.ru}
              </span>
              <span className="text-[10px] text-[var(--faint)]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
