import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdoptionForm from "./AdoptionForm";

type AdoptionPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdoptionPage({ params }: AdoptionPageProps) {
  const { id } = await params;

  const animal = await prisma.animal.findUnique({
    where: { id },
  });

  if (!animal || !animal.adoptionAvailable) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-[#4A2511]">
          Solicitar adoção de {animal.name}
        </h1>

        <p className="mt-3 text-gray-600">
          Conte um pouco sobre você e por que deseja adotar este animal.
          A ONG responsável analisará sua solicitação.
        </p>

        <AdoptionForm animalId={animal.id} />
      </div>
    </div>
  );
}