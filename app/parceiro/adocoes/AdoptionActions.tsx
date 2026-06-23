"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/compentents/ui/Button";

type AdoptionActionsProps = {
  requestId: string;
};

export default function AdoptionActions({
  requestId,
}: AdoptionActionsProps) {
  const router = useRouter();

  async function updateAdoption(
    status: "IN_ANALYSIS" | "APPROVED" | "REJECTED"
  ) {
    const response = await fetch(`/api/adocoes/${requestId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      alert("Não foi possível atualizar a solicitação.");
      return;
    }

    router.refresh();
  }

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Button
        variant="outline"
        onClick={() => updateAdoption("IN_ANALYSIS")}
      >
        Em análise
      </Button>

      <Button onClick={() => updateAdoption("APPROVED")}>
        Aprovar
      </Button>

      <Button
        variant="secondary"
        onClick={() => updateAdoption("REJECTED")}
      >
        Rejeitar
      </Button>
    </div>
  );
}