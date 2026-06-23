import { prisma } from "@/lib/prisma";
import AdoptionActions from "./AdoptionActions";

export default async function PartnerAdoptionsPage() {
  const requests = await prisma.adoptionRequest.findMany({
    include: {
      animal: true,
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold text-[#4A2511]">
        Solicitações de Adoção
      </h1>

      {requests.length === 0 && (
        <p className="text-gray-600">
          Nenhuma solicitação de adoção encontrada.
        </p>
      )}

      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold">{request.animal.name}</h2>

            <p className="mt-2 text-gray-600">
              Solicitante: {request.user.name}
            </p>

            <p className="mt-2 font-semibold">
              Status: {request.status}
            </p>

            {request.message && (
              <p className="mt-2 text-gray-600">
                Mensagem: {request.message}
              </p>
            )}

            <AdoptionActions requestId={request.id} />
          </div>
        ))}
      </div>
    </div>
  );
}