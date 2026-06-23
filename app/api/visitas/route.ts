import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
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

    if (!animal) {
      return NextResponse.json(
        { error: "Animal não encontrado." },
        { status: 404 }
      );
    }

    const visit = await prisma.visit.create({
      data: {
        userId: testUser.id,
        animalId: animal.id,
        partnerId: animal.partnerId,
        visitDatetime: new Date(body.visitDatetime),
        notes: body.notes,
      },
    });

    return NextResponse.json(visit, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao solicitar visita." },
      { status: 500 }
    );
  }
}