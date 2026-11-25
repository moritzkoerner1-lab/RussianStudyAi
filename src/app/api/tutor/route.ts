import { mockTutorReply, tutorSystemPrompt } from "@/lib/tutors";
import type { HelpLang, TutorId } from "@/lib/types";

export const runtime = "nodejs";

type Body = {
  messages?: { role: "user" | "tutor" | "system"; text: string }[];
  tutor?: TutorId;
  helpLang?: HelpLang;
  mode?: "speak" | "walk" | "lesson";
  learnerName?: string;
  genderPast?: "был" | "была";
  lessonHint?: string;
  visionHint?: string;
};

export async function POST(request: Request) {
  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const tutor = body.tutor === "lev" ? "lev" : "ara";
  const helpLang = body.helpLang === "de" ? "de" : "en";
  const mode = body.mode ?? "speak";
  const lastUser =
    [...(body.messages || [])].reverse().find((m) => m.role === "user")?.text ||
    "";

  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) {
    const mock = mockTutorReply(lastUser, tutor, helpLang, mode);
    return Response.json({
      ...mock,
      provider: "demo",
      demo: true,
    });
  }

  const system = tutorSystemPrompt(
    tutor,
    helpLang,
    body.learnerName || "",
    body.genderPast || "был",
    mode,
    body.lessonHint,
  );

  const history = (body.messages || [])
    .filter((m) => m.role !== "system")
    .slice(-12)
    .map((m) => ({
      role: m.role === "tutor" ? ("assistant" as const) : ("user" as const),
      content: m.text,
    }));

  if (body.visionHint) {
    history.push({
      role: "user",
      content: `[What I see / camera]: ${body.visionHint}`,
    });
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
        temperature: 0.6,
        messages: [{ role: "system", content: system }, ...history],
      }),
    });

    if (!res.ok) {
      const mock = mockTutorReply(lastUser, tutor, helpLang, mode);
      return Response.json({ ...mock, provider: "demo", demo: true, upstream: res.status });
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content?.trim() || "";
    const parsed = parseTutorOutput(content);
    return Response.json({ ...parsed, provider: "openai", demo: false });
  } catch {
    const mock = mockTutorReply(lastUser, tutor, helpLang, mode);
    return Response.json({ ...mock, provider: "demo", demo: true });
  }
}

function parseTutorOutput(content: string): {
  reply: string;
  correction?: string;
  help?: string;
} {
  const lines = content.split("\n").map((l) => l.trim()).filter(Boolean);
  let correction: string | undefined;
  let help: string | undefined;
  const replyLines: string[] = [];

  for (const line of lines) {
    const c = line.match(/^CORRECT:\s*(.+)$/i);
    const h = line.match(/^HELP:\s*(.+)$/i);
    if (c) correction = c[1];
    else if (h) help = h[1];
    else replyLines.push(line.replace(/^\d+[).]\s*/, ""));
  }

  return {
    reply: replyLines.join("\n") || content,
    correction,
    help,
  };
}
