import { prisma } from "@/lib/prisma";

export default async function VisitsPage() {
  const user = await prisma.user.findUnique({
    where: {
      email: "raphael@amicis.com",
    },
  });

  if (!user) {
    return <div>Usuário não encontrado.</div>;
  }

  const visits = await prisma.visit.findMany({
    where: {
      userId: user.id,
    },
    include: {
      animal: true,
      partner: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold text-[#4A2511]">
        Minhas Visitas
      </h1>

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
              ONG: {visit.partner.fantasyName}
            </p>

            <p className="mt-2">
              Data:
              {" "}
              {new Date(
                visit.visitDatetime
              ).toLocaleString("pt-BR")}
            </p>

            <p className="mt-2 font-semibold">
              Status: {visit.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}