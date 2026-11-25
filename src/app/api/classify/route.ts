import { classifyLocal } from "@/lib/classify";
import type { NoteKind } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let text = "";
  try {
    const body = (await request.json()) as { text?: string };
    text = (body.text || "").trim();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!text) {
    return Response.json({ kind: "word" as NoteKind, source: "local" });
  }

  const local = classifyLocal(text);
  const key = process.env.OPENAI_API_KEY?.trim();

  if (!key) {
    return Response.json({ kind: local, source: "local", demo: true });
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0,
        messages: [
          {
            role: "system",
            content:
              'Classify a Russian learner notebook entry. Reply with ONLY one word: word | grammar | usecase | phrase.',
          },
          { role: "user", content: text },
        ],
      }),
    });
    if (!res.ok) {
      return Response.json({ kind: local, source: "local", demo: true });
    }
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const raw = (data.choices?.[0]?.message?.content || "").toLowerCase();
    const kind: NoteKind = raw.includes("grammar")
      ? "grammar"
      : raw.includes("usecase") || raw.includes("use case")
        ? "usecase"
        : raw.includes("phrase")
          ? "phrase"
          : "word";
    return Response.json({ kind, source: "openai", demo: false });
  } catch {
    return Response.json({ kind: local, source: "local", demo: true });
  }
}
