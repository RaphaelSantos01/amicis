import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type RouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(req: Request, { params }: RouteProps) {
  const { id } = await params;
  const body = await req.json();

  const sponsorshipRequest = await prisma.sponsorshipRequest.update({
    where: { id },
    data: {
      status: body.status,
    },
  });

  return NextResponse.json(sponsorshipRequest);
}