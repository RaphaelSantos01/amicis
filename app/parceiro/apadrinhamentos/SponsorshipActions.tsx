"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/compentents/ui/Button";

type SponsorshipActionsProps = {
  requestId: string;
};

export default function SponsorshipActions({
  requestId,
}: SponsorshipActionsProps) {
  const router = useRouter();

  async function updateSponsorship(
    status: "IN_ANALYSIS" | "APPROVED" | "REJECTED"
  ) {
    const response = await fetch(`/api/apadrinhamentos/${requestId}`, {
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
        onClick={() => updateSponsorship("IN_ANALYSIS")}
      >
        Em análise
      </Button>

      <Button onClick={() => updateSponsorship("APPROVED")}>
        Aprovar
      </Button>

      <Button
        variant="secondary"
        onClick={() => updateSponsorship("REJECTED")}
      >
        Rejeitar
      </Button>
    </div>
  );
}