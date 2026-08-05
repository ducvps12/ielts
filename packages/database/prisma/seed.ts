import { PrismaClient, GoalTemplateStatus, QuestType, UserStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const template = await prisma.goalTemplate.upsert({
    where: {
      slug_version: {
        slug: "ielts-7-5-180-ngay",
        version: 1,
      },
    },
    update: {},
    create: {
      slug: "ielts-7-5-180-ngay",
      name: "IELTS 7.5 — Hành trình 180 ngày",
      description:
        "Lộ trình nhiệm vụ theo ngày giúp người học xây nền, rèn kỹ năng và mô phỏng kỳ thi. Không cam kết điểm đầu ra.",
      status: GoalTemplateStatus.PUBLISHED,
      version: 1,
      estimatedDays: 180,
      metadata: {
        language: "vi",
        targetBand: 7.5,
        disclaimer: "Band thật phải được xác nhận bằng bài thi thử hoặc kỳ thi chính thức.",
      },
    },
  });

  const quests = [
    {
      key: "day-1-main-reading-baseline",
      title: "Khảo sát Reading",
      description: "Làm một Reading passage trong 40 phút, không tra từ khi đang làm.",
      type: QuestType.MAIN,
      dayOffset: 1,
      estimatedMins: 40,
      xpReward: 40,
      goldReward: 12,
    },
    {
      key: "day-1-side-error-log",
      title: "Sổ lỗi đầu tiên",
      description: "Ghi năm câu sai và phân loại nguyên nhân.",
      type: QuestType.SIDE,
      dayOffset: 1,
      estimatedMins: 20,
      xpReward: 25,
      goldReward: 7,
    },
    {
      key: "day-1-bonus-collocations",
      title: "Mười collocations",
      description: "Lấy mười cụm từ trong bài và tự đặt ba câu.",
      type: QuestType.BONUS,
      dayOffset: 1,
      estimatedMins: 15,
      xpReward: 15,
      goldReward: 5,
    },
  ];

  for (const quest of quests) {
    await prisma.questTemplate.upsert({
      where: {
        goalTemplateId_key: {
          goalTemplateId: template.id,
          key: quest.key,
        },
      },
      update: quest,
      create: {
        ...quest,
        goalTemplateId: template.id,
      },
    });
  }

  await prisma.user.upsert({
    where: { email: "demo@levelup.local" },
    update: {},
    create: {
      email: "demo@levelup.local",
      displayName: "IELTS Hunter",
      status: UserStatus.ACTIVE,
      wallet: {
        create: {
          goldBalance: 0,
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
