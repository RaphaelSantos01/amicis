import { prisma } from "@/lib/prisma";
import SponsorshipActions from "./SponsorshipActions";

export default async function PartnerSponsorshipsPage() {
  const requests = await prisma.sponsorshipRequest.findMany({
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
        Solicitações de Apadrinhamento
      </h1>

      {requests.length === 0 && (
        <p className="text-gray-600">
          Nenhuma solicitação de apadrinhamento encontrada.
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

            <p className="mt-2 text-gray-600">
              Tipo de apoio: {request.supportType}
            </p>

            {request.estimatedValue && (
              <p className="mt-2 text-gray-600">
                Valor estimado: R$ {Number(request.estimatedValue).toFixed(2)}
              </p>
            )}

            {request.frequency && (
              <p className="mt-2 text-gray-600">
                Frequência: {request.frequency}
              </p>
            )}

            {request.message && (
              <p className="mt-2 text-gray-600">
                Mensagem: {request.message}
              </p>
            )}

            <SponsorshipActions requestId={request.id} />
          </div>
        ))}
      </div>
    </div>
  );
}