import { prisma } from "@/lib/prisma";
import VisitActions from "./VisitActions";

export default async function PartnerVisitsPage() {
  const visits = await prisma.visit.findMany({
    include: {
      animal: true,
      user: true,
      partner: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold text-[#4A2511]">
        Solicitações de Visita
      </h1>

      {visits.length === 0 && (
        <p className="text-gray-600">
          Nenhuma solicitação de visita encontrada.
        </p>
      )}

      <div className="space-y-4">
        {visits.map((visit) => (
          <div
            key={visit.id}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold">
              {visit.animal.name}
            </h2>

            <p className="mt-2 text-gray-600">
              Solicitante: {visit.user.name}
            </p>

            <p className="mt-2 text-gray-600">
              Parceiro responsável: {visit.partner.fantasyName}
            </p>

            <p className="mt-2">
              Data:{" "}
              {new Date(visit.visitDatetime).toLocaleString("pt-BR")}
            </p>

            <p className="mt-2 font-semibold">
              Status: {visit.status}
            </p>

            {visit.notes && (
              <p className="mt-2 text-gray-600">
                Observação: {visit.notes}
              </p>
            )}

            <VisitActions visitId={visit.id} />
          </div>
        ))}
      </div>
    </div>
  );
}