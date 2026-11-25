"use client";

import { speakRu } from "@/lib/speech";
import type { SeeBend } from "@/lib/thread";

export function SeeStrip({ see }: { see: SeeBend }) {
  return (
    <button
      type="button"
      className="see-strip"
      onClick={() => void speakRu(see.audio || see.bend)}
      aria-label="Hear this bend"
    >
      <span className="see-label">See</span>
      <span className="see-bend ru">{see.bend}</span>
      {see.gloss ? <span className="see-gloss">{see.gloss}</span> : null}
      <span className="see-hear">tap · hear</span>
    </button>
  );
}
