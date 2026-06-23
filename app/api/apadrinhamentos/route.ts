import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const testUser = await prisma.user.findUnique({
    where: { email: "raphael@amicis.com" },
  });

  if (!testUser) {
    return NextResponse.json(
      { error: "Usuário de teste não encontrado." },
      { status: 404 }
    );
  }

  const animal = await prisma.animal.findUnique({
    where: { id: body.animalId },
  });

  if (!animal || !animal.sponsorshipAvailable) {
    return NextResponse.json(
      { error: "Animal não disponível para apadrinhamento." },
      { status: 400 }
    );
  }

  const sponsorshipRequest = await prisma.sponsorshipRequest.create({
    data: {
      userId: testUser.id,
      animalId: animal.id,
      supportType: body.supportType,
      estimatedValue: body.estimatedValue,
      frequency: body.frequency,
      message: body.message,
    },
  });

  return NextResponse.json(sponsorshipRequest, { status: 201 });
}