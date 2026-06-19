import { PrismaClient, PartnerType, PartnerStatus, ProfileType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
  where: { email: "admin@amicis.com" },
  update: {},
  create: {
    name: "Administrador AMICIS",
    email: "admin@amicis.com",
    passwordHash: "senha_simulada",
    profileType: ProfileType.ADMIN,
  },
});

  const commonUser = await prisma.user.upsert({
  where: { email: "raphael@amicis.com" },
  update: {},
  create: {
    name: "Raphael Teste",
    email: "raphael@amicis.com",
    passwordHash: "senha_simulada",
    profileType: ProfileType.COMMON_USER,
  },
});

  const ongUser = await prisma.user.upsert({
  where: { email: "ong@amicis.com" },
  update: {},
  create: {
    name: "ONG Patinhas Felizes",
    email: "ong@amicis.com",
    passwordHash: "senha_simulada",
    profileType: ProfileType.INSTITUTIONAL_PARTNER,
  },
});

  const clinicUser = await prisma.user.upsert({
  where: { email: "clinica@amicis.com" },
  update: {},
  create: {
    name: "Clínica Vida Animal",
    email: "clinica@amicis.com",
    passwordHash: "senha_simulada",
    profileType: ProfileType.COMMERCIAL_PARTNER,
  },
});

  const ong = await prisma.partner.create({
    data: {
      userId: ongUser.id,
      partnerType: PartnerType.INSTITUTIONAL,
      fantasyName: "ONG Patinhas Felizes",
      legalName: "Associação Patinhas Felizes",
      email: "contato@patinhasfelizes.org",
      phone: "(15) 99999-0001",
      description: "ONG dedicada ao resgate, cuidado e adoção responsável de animais.",
      status: PartnerStatus.APPROVED,
    },
  });

  const clinic = await prisma.partner.create({
    data: {
      userId: clinicUser.id,
      partnerType: PartnerType.COMMERCIAL,
      fantasyName: "Clínica Vida Animal",
      legalName: "Clínica Vida Animal LTDA",
      email: "contato@vidaanimal.com",
      phone: "(15) 99999-0002",
      description: "Clínica veterinária parceira especializada em cuidados preventivos.",
      status: PartnerStatus.APPROVED,
    },
  });

  await prisma.animal.createMany({
    data: [
      {
        partnerId: ong.id,
        name: "Thor",
        species: "Cachorro",
        breed: "Labrador",
        sex: "Macho",
        age: 4,
        size: "Grande",
        description: "Cão dócil, companheiro e ideal para famílias.",
        adoptionAvailable: true,
        sponsorshipAvailable: false,
      },
      {
        partnerId: ong.id,
        name: "Luna",
        species: "Gato",
        breed: "SRD",
        sex: "Fêmea",
        age: 2,
        size: "Pequeno",
        description: "Gata carinhosa, tranquila e sociável.",
        adoptionAvailable: true,
        sponsorshipAvailable: true,
      },
      {
        partnerId: ong.id,
        name: "Max",
        species: "Cachorro",
        breed: "SRD",
        sex: "Macho",
        age: 6,
        size: "Médio",
        description: "Precisa de apoio para alimentação e medicamentos.",
        adoptionAvailable: false,
        sponsorshipAvailable: true,
      },
    ],
  });

  await prisma.service.createMany({
    data: [
      {
        partnerId: clinic.id,
        name: "Consulta Veterinária",
        category: "Veterinário",
        description: "Consulta clínica geral para cães e gatos.",
        price: 120,
        durationMinutes: 40,
      },
      {
        partnerId: clinic.id,
        name: "Vacinação",
        category: "Veterinário",
        description: "Aplicação de vacinas conforme necessidade do pet.",
        price: 90,
        durationMinutes: 30,
      },
    ],
  });

  await prisma.product.createMany({
    data: [
      {
        partnerId: clinic.id,
        name: "Ração Premium Cães",
        category: "Ração",
        description: "Ração premium para cães adultos.",
        price: 149.9,
        stockQuantity: 20,
      },
      {
        partnerId: clinic.id,
        name: "Brinquedo Mordedor",
        category: "Brinquedos",
        description: "Brinquedo resistente para cães.",
        price: 39.9,
        stockQuantity: 35,
      },
    ],
  });

  await prisma.plan.createMany({
    data: [
      {
        name: "Plano Essencial",
        description: "Benefícios básicos para cuidados recorrentes com o pet.",
        monthlyPrice: 29.9,
      },
      {
        name: "Plano Bem-Estar",
        description: "Benefícios ampliados para serviços e produtos parceiros.",
        monthlyPrice: 59.9,
      },
    ],
  });

  console.log("Seed executado com sucesso!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });