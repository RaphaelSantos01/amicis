import { prisma } from "@/lib/prisma";
import { Card } from "@/compentents/ui/Card";
import { Badge } from "@/compentents/ui/Badge";
import Link from "next/link";

export default async function AnimaisPage() {
  const animais = await prisma.animal.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold text-[#4A2511]">
        Animais Disponíveis
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        {animais.map((animal) => (
          <Card key={animal.id}>
            <h2 className="text-xl font-bold">
              {animal.name}
            </h2>

            <p className="mt-2 text-gray-600">
              {animal.species}
            </p>

            <p className="text-gray-600">
              {animal.breed}
            </p>

            <div className="mt-4 flex gap-2">
              {animal.adoptionAvailable && (
                <Badge>
                  Adoção
                </Badge>
              )}

              {animal.sponsorshipAvailable && (
                <Badge variant="brown">
                  Apadrinhamento
                </Badge>
              )}
            </div>

            <Link
            href={`/animais/${animal.id}`}
            className="mt-6 inline-block text-sm font-semibold text-[#F28C28]"
            >
            Ver detalhes
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}