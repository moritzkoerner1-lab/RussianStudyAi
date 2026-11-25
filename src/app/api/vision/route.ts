export const runtime = "nodejs";

type Body = {
  imageBase64?: string;
  mimeType?: string;
  prompt?: string;
};

/** Describe a camera frame for Walk mode. Falls back to a demo scene. */
export async function POST(request: Request) {
  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key || !body.imageBase64) {
    return Response.json({
      description:
        "A winter street scene: a blue car, a green wall, a tree with bare branches, and snow on the sidewalk.",
      demo: true,
      labels: ["машина", "стена", "дерево", "снег"],
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
        temperature: 0.2,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text:
                  body.prompt ||
                  "Describe the main visible objects for a Russian beginner walk lesson. One short English sentence, then list 4-6 simple Russian nouns/adjectives the learner can say.",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:${body.mimeType || "image/jpeg"};base64,${body.imageBase64}`,
                },
              },
            ],
          },
        ],
      }),
    });

    if (!res.ok) {
      return Response.json({
        description: "Something outdoors — name what you see in Russian.",
        demo: true,
        labels: ["это", "стена", "машина", "дерево"],
      });
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const description = data.choices?.[0]?.message?.content?.trim() || "";
    return Response.json({ description, demo: false, labels: [] });
  } catch {
    return Response.json({
      description: "Something outdoors — name what you see in Russian.",
      demo: true,
      labels: ["это", "стена", "машина", "дерево"],
    });
  }
}
