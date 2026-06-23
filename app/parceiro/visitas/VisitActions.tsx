"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/compentents/ui/Button";

type VisitActionsProps = {
  visitId: string;
};

export default function VisitActions({ visitId }: VisitActionsProps) {
  const router = useRouter();

  async function updateVisit(status: "CONFIRMED" | "CANCELED") {
    const response = await fetch(`/api/visitas/${visitId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      alert("Não foi possível atualizar a visita.");
      return;
    }

    router.refresh();
  }

  return (
    <div className="mt-6 flex gap-3">
      <Button onClick={() => updateVisit("CONFIRMED")}>
        Confirmar
      </Button>

      <Button
        variant="outline"
        onClick={() => updateVisit("CANCELED")}
      >
        Cancelar
      </Button>
    </div>
  );
}