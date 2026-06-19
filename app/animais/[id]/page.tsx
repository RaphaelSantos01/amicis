import { prisma } from "@/lib/prisma";
import { Badge } from "@/compentents/ui/Badge";
import { Button } from "@/compentents/ui/Button";
import { notFound } from "next/navigation";

type AnimalDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AnimalDetailsPage({
  params,
}: AnimalDetailsPageProps) {
  const { id } = await params;

  const animal = await prisma.animal.findUnique({
    where: {
      id,
    },
    include: {
      partner: true,
    },
  });

  if (!animal) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <div className="mb-4 flex gap-2">
          {animal.adoptionAvailable && <Badge>Adoção</Badge>}

          {animal.sponsorshipAvailable && (
            <Badge variant="brown">Apadrinhamento</Badge>
          )}
        </div>

        <h1 className="text-4xl font-bold text-[#4A2511]">
          {animal.name}
        </h1>

        <p className="mt-2 text-lg text-gray-600">
          {animal.species} • {animal.breed || "Sem raça definida"} •{" "}
          {animal.sex}
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-gray-500">Idade</p>
            <p>{animal.age ? `${animal.age} anos` : "Não informada"}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-500">Porte</p>
            <p>{animal.size || "Não informado"}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-500">Responsável</p>
            <p>{animal.partner.fantasyName}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#4A2511]">
            Sobre {animal.name}
          </h2>

          <p className="mt-3 text-gray-700">{animal.description}</p>
        </div>

        {animal.healthNotes && (
          <div className="mt-6 rounded-2xl bg-[#FFF8F1] p-4">
            <h3 className="font-semibold text-[#4A2511]">
              Cuidados de saúde
            </h3>

            <p className="mt-2 text-gray-700">{animal.healthNotes}</p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-4">
          {animal.adoptionAvailable && <Button>Solicitar Adoção</Button>}

          {animal.sponsorshipAvailable && (
            <Button variant="secondary">Solicitar Apadrinhamento</Button>
          )}

          <Button variant="outline">Agendar Visita</Button>
        </div>
      </div>
    </div>
  );
}