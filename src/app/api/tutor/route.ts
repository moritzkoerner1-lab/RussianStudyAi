import { araSystemPrompt, mockAraReply } from "@/lib/tutors";
import type { HelpLang } from "@/lib/types";

export const runtime = "nodejs";

type Body = {
  messages?: { role: "user" | "ara" | "tutor" | "system"; text: string }[];
  helpLang?: HelpLang;
  learnerName?: string;
  genderPast?: "был" | "была";
  ownedHint?: string;
  opening?: boolean;
};

export async function POST(request: Request) {
  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const helpLang = body.helpLang === "de" ? "de" : "en";
  const lastUser =
    [...(body.messages || [])].reverse().find((m) => m.role === "user")?.text ||
    "";

  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) {
    const mock = mockAraReply(lastUser, helpLang);
    return Response.json({ ...mock, provider: "demo", demo: true });
  }

  const system = araSystemPrompt(
    helpLang,
    body.learnerName || "",
    body.genderPast || "был",
    body.ownedHint,
  );

  const history = (body.messages || [])
    .filter((m) => m.role !== "system")
    .slice(-16)
    .map((m) => ({
      role:
        m.role === "ara" || m.role === "tutor"
          ? ("assistant" as const)
          : ("user" as const),
      content: m.text,
    }));

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.55,
        messages: [{ role: "system", content: system }, ...history],
      }),
    });

    if (!res.ok) {
      const mock = mockAraReply(lastUser, helpLang);
      return Response.json({
        ...mock,
        provider: "demo",
        demo: true,
        upstream: res.status,
      });
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content?.trim() || "";
    return Response.json({
      ...parseAraOutput(content),
      provider: "openai",
      demo: false,
    });
  } catch {
    const mock = mockAraReply(lastUser, helpLang);
    return Response.json({ ...mock, provider: "demo", demo: true });
  }
}

function parseAraOutput(content: string): {
  reply: string;
  native?: string;
  see?: { bend: string; audio: string; gloss?: string };
  help?: string;
} {
  const lines = content
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  let native: string | undefined;
  let help: string | undefined;
  let see: { bend: string; audio: string; gloss?: string } | undefined;
  const replyLines: string[] = [];

  for (const line of lines) {
    const n = line.match(/^NATIVE:\s*(.+)$/i);
    const h = line.match(/^HELP:\s*(.+)$/i);
    const s = line.match(/^SEE:\s*(.+)$/i);
    if (n) {
      native = n[1];
      continue;
    }
    if (h) {
      help = h[1];
      continue;
    }
    if (s) {
      const parts = s[1].split("||").map((p) => p.trim());
      see = {
        bend: parts[0] || "",
        audio: parts[1] || parts[0] || "",
        gloss: parts[2] || undefined,
      };
      continue;
    }
    replyLines.push(line.replace(/^\d+[).]\s*/, ""));
  }

  return {
    reply: replyLines.join("\n") || content,
    native,
    see: see?.bend ? see : undefined,
    help,
  };
}
