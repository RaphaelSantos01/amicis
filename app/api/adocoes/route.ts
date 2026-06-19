import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const adoptionRequest =
      await prisma.adoptionRequest.create({
        data: {
          userId: body.userId,
          animalId: body.animalId,
          message: body.message,
        },
      });

    return NextResponse.json(adoptionRequest);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erro ao criar solicitação",
      },
      {
        status: 500,
      }
    );
  }
}