"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/compentents/ui/Button";

type AdoptionFormProps = {
  animalId: string;
};

export default function AdoptionForm({ animalId }: AdoptionFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const response = await fetch("/api/adocoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        animalId,
        message,
      }),
    });

    setLoading(false);

    if (!response.ok) {
      alert("Não foi possível solicitar a adoção.");
      return;
    }

    alert("Solicitação de adoção enviada com sucesso!");
    router.push(`/animais/${animalId}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold text-[#4A2511]">
          Mensagem para a ONG
        </label>

        <textarea
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Explique sua motivação, experiência com animais e rotina."
          className="min-h-40 w-full rounded-xl border px-4 py-3 outline-none focus:border-[#F28C28]"
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Enviar solicitação"}
      </Button>
    </form>
  );
}