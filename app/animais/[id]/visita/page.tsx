import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import VisitForm from "./VisitForm";

type VisitPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function VisitPage({ params }: VisitPageProps) {
  const { id } = await params;

  const animal = await prisma.animal.findUnique({
    where: { id },
  });

  if (!animal) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-[#4A2511]">
          Agendar visita para conhecer {animal.name}
        </h1>

        <p className="mt-3 text-gray-600">
          Escolha uma data e horário para solicitar uma visita. A ONG responsável
          receberá sua solicitação e poderá confirmar o agendamento.
        </p>

        <VisitForm animalId={animal.id} />
      </div>
    </div>
  );
}