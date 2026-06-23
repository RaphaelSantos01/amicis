import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import SponsorshipForm from "./SponsorshipForm";

type SponsorshipPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SponsorshipPage({
  params,
}: SponsorshipPageProps) {
  const { id } = await params;

  const animal = await prisma.animal.findUnique({
    where: { id },
  });

  if (!animal || !animal.sponsorshipAvailable) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-[#4A2511]">
          Apadrinhar {animal.name}
        </h1>

        <p className="mt-3 text-gray-600">
          Escolha como deseja ajudar este animal. A ONG responsável analisará sua
          solicitação de apadrinhamento.
        </p>

        <SponsorshipForm animalId={animal.id} />
      </div>
    </div>
  );
}