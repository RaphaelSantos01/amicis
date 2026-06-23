"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/compentents/ui/Button";

type VisitFormProps = {
  animalId: string;
};

export default function VisitForm({ animalId }: VisitFormProps) {
  const router = useRouter();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const response = await fetch("/api/visitas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        animalId,
        visitDatetime: `${date}T${time}:00`,
        notes,
      }),
    });

    setLoading(false);

    if (!response.ok) {
      alert("Não foi possível solicitar a visita.");
      return;
    }

    alert("Visita solicitada com sucesso!");
    router.push(`/animais/${animalId}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold text-[#4A2511]">
          Data
        </label>
        <input
          type="date"
          required
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#F28C28]"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#4A2511]">
          Horário
        </label>
        <input
          type="time"
          required
          value={time}
          onChange={(event) => setTime(event.target.value)}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#F28C28]"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#4A2511]">
          Observações
        </label>
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Informe alguma observação para a ONG, se desejar."
          className="min-h-32 w-full rounded-xl border px-4 py-3 outline-none focus:border-[#F28C28]"
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Solicitar visita"}
      </Button>
    </form>
  );
}