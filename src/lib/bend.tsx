/** Render вода → вод[у] with only the changed letters in lacquer red. */
export function BendLine({
  from,
  to,
  bend,
}: {
  from?: string;
  to?: string;
  bend?: string;
}) {
  let left = from?.trim() || "";
  let right = to?.trim() || "";

  if ((!left || !right) && bend) {
    const parts = bend.split(/\s*→\s*|\s*->\s*/);
    if (parts.length === 2) {
      left = stripStress(parts[0].trim());
      right = stripStress(parts[1].trim());
    }
  }

  if (!left || !right) {
    return <p className="bend-row">{bend || ""}</p>;
  }

  let i = 0;
  while (i < left.length && i < right.length && left[i] === right[i]) i += 1;
  const shared = right.slice(0, i);
  const changed = right.slice(i);

  return (
    <p className="bend-row">
      {left} → {shared}
      <span className="bend-red">{changed}</span>
    </p>
  );
}

export function parseBend(bend?: string): { from?: string; to?: string } {
  if (!bend) return {};
  const parts = bend.split(/\s*→\s*|\s*->\s*/);
  if (parts.length !== 2) return {};
  return { from: stripStress(parts[0].trim()), to: stripStress(parts[1].trim()) };
}

function stripStress(s: string) {
  return s.replace(/\u0301/g, "").replace(/́/g, "");
}
