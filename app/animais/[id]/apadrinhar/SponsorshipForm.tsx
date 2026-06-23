"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/compentents/ui/Button";

type SponsorshipFormProps = {
  animalId: string;
};

export default function SponsorshipForm({
  animalId,
}: SponsorshipFormProps) {
  const router = useRouter();

  const [supportType, setSupportType] = useState("alimentacao");
  const [estimatedValue, setEstimatedValue] = useState("");
  const [frequency, setFrequency] = useState("mensal");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const response = await fetch("/api/apadrinhamentos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        animalId,
        supportType,
        estimatedValue: estimatedValue ? Number(estimatedValue) : null,
        frequency,
        message,
      }),
    });

    setLoading(false);

    if (!response.ok) {
      alert("Não foi possível solicitar o apadrinhamento.");
      return;
    }

    alert("Solicitação de apadrinhamento enviada com sucesso!");
    router.push(`/animais/${animalId}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold text-[#4A2511]">
          Tipo de apoio
        </label>

        <select
          value={supportType}
          onChange={(event) => setSupportType(event.target.value)}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#F28C28]"
        >
          <option value="alimentacao">Alimentação</option>
          <option value="medicamentos">Medicamentos</option>
          <option value="consultas">Consultas veterinárias</option>
          <option value="banho_tosa">Banho e tosa</option>
          <option value="financeiro">Apoio financeiro</option>
          <option value="outros">Outros</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#4A2511]">
          Valor estimado
        </label>

        <input
          type="number"
          min="0"
          step="0.01"
          value={estimatedValue}
          onChange={(event) => setEstimatedValue(event.target.value)}
          placeholder="Ex.: 50.00"
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#F28C28]"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#4A2511]">
          Frequência
        </label>

        <select
          value={frequency}
          onChange={(event) => setFrequency(event.target.value)}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#F28C28]"
        >
          <option value="mensal">Mensal</option>
          <option value="unico">Apoio único</option>
          <option value="quinzenal">Quinzenal</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#4A2511]">
          Mensagem para a ONG
        </label>

        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Conte como deseja ajudar."
          className="min-h-36 w-full rounded-xl border px-4 py-3 outline-none focus:border-[#F28C28]"
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Enviar solicitação"}
      </Button>
    </form>
  );
}