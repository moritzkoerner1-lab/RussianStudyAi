"use client";

import { useMemo, useState } from "react";
import { GovoritScreen } from "@/components/GovoritScreen";
import { IdtiScreen } from "@/components/IdtiScreen";
import { SestScreen } from "@/components/SestScreen";
import { useAraThread } from "@/hooks/useAraThread";

type Posture = "govorit" | "sest" | "idti";
type SitStep = "hear" | "see" | "say";

export function App() {
  const [posture, setPosture] = useState<Posture>("govorit");
  const [sitStep, setSitStep] = useState<SitStep>("see");
  const thread = useAraThread();

  const drillIndex = useMemo(() => {
    return Math.max(
      1,
      thread.turns.filter((t) => t.role === "ara" && (t.native || t.see)).length,
    );
  }, [thread.turns]);

  if (!thread.ready) {
    return (
      <div className="phone">
        <div className="top">
          <span className="brand">ВЖИВУЮ</span>
          <span className="dot" aria-hidden />
        </div>
        <div className="stage" />
      </div>
    );
  }

  if (posture === "sest") {
    return (
      <SestScreen
        posture={posture}
        onPosture={setPosture}
        step={sitStep}
        onStep={setSitStep}
        thread={thread}
        drillIndex={drillIndex}
      />
    );
  }

  if (posture === "idti") {
    return <IdtiScreen posture={posture} onPosture={setPosture} thread={thread} />;
  }

  return (
    <GovoritScreen posture={posture} onPosture={setPosture} thread={thread} />
  );
}
