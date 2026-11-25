"use client";

import { useState } from "react";
import { GovoritScreen } from "@/components/GovoritScreen";
import { IdtiScreen } from "@/components/IdtiScreen";
import { SestScreen } from "@/components/SestScreen";

type Posture = "govorit" | "sest" | "idti";
type SitStep = "hear" | "see" | "say";

export function App() {
  const [posture, setPosture] = useState<Posture>("govorit");
  const [sitStep, setSitStep] = useState<SitStep>("see");

  if (posture === "sest") {
    return (
      <SestScreen
        posture={posture}
        onPosture={setPosture}
        step={sitStep}
        onStep={setSitStep}
      />
    );
  }

  if (posture === "idti") {
    return <IdtiScreen posture={posture} onPosture={setPosture} />;
  }

  return <GovoritScreen posture={posture} onPosture={setPosture} />;
}
