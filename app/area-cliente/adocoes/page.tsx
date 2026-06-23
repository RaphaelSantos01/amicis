import { prisma } from "@/lib/prisma";

export default async function AdoptionsPage() {
  const user = await prisma.user.findUnique({
    where: {
      email: "raphael@amicis.com",
    },
  });

  if (!user) {
    return <div>Usuário não encontrado.</div>;
  }

  const requests = await prisma.adoptionRequest.findMany({
    where: {
      userId: user.id,
    },
    include: {
      animal: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold text-[#4A2511]">
        Minhas Solicitações de Adoção
      </h1>

      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold">
              {request.animal.name}
            </h2>

            <p className="mt-2">
              Status: {request.status}
            </p>

            {request.message && (
              <p className="mt-2 text-gray-600">
                {request.message}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}