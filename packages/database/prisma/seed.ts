import {
  BillingInterval,
  GoalCategory,
  GoalStatus,
  GoalTemplateStatus,
  PaymentProvider,
  PrismaClient,
  ProductStatus,
  QuestType,
  UserStatus,
} from "@prisma/client";

const prisma = new PrismaClient();

async function seedPrice(input: {
  planId: string;
  currency: string;
  amountMinor: number;
  countryCode?: string;
  provider: PaymentProvider;
}): Promise<void> {
  const existing = await prisma.price.findFirst({
    where: {
      planId: input.planId,
      currency: input.currency,
      countryCode: input.countryCode,
      provider: input.provider,
    },
  });

  if (existing) {
    await prisma.price.update({
      where: { id: existing.id },
      data: {
        amountMinor: input.amountMinor,
        active: false,
      },
    });
    return;
  }

  await prisma.price.create({
    data: {
      ...input,
      active: false,
    },
  });
}

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
        vertical: "language-studio",
        learningLanguage: "en",
        uiLocale: "vi",
        targetBand: 7.5,
        disclaimer:
          "Band thật phải được xác nhận bằng bài thi thử hoặc kỳ thi chính thức.",
      },
    },
  });

  const quests = [
    {
      key: "day-1-main-reading-baseline",
      title: "Khảo sát Reading",
      description:
        "Làm một Reading passage trong 40 phút, không tra từ khi đang làm.",
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

  const user = await prisma.user.upsert({
    where: { email: "demo@levelup.local" },
    update: {
      displayName: "Goal Builder",
      locale: "vi-VN",
      timezone: "Asia/Ho_Chi_Minh",
    },
    create: {
      email: "demo@levelup.local",
      displayName: "Goal Builder",
      status: UserStatus.ACTIVE,
      locale: "vi-VN",
      timezone: "Asia/Ho_Chi_Minh",
      wallet: {
        create: {
          goldBalance: 0,
        },
      },
    },
  });

  await prisma.languageProfile.upsert({
    where: {
      userId_learningLanguage: {
        userId: user.id,
        learningLanguage: "en",
      },
    },
    update: {
      uiLocale: "vi",
      explanationLanguage: "vi",
      proficiencyFramework: "CEFR",
      proficiencyLevel: "B1",
    },
    create: {
      userId: user.id,
      uiLocale: "vi",
      learningLanguage: "en",
      explanationLanguage: "vi",
      proficiencyFramework: "CEFR",
      proficiencyLevel: "B1",
      preferences: {
        pronunciationVariant: "mixed",
        transcriptTranslationDefault: false,
      },
    },
  });

  const existingGoal = await prisma.goal.findFirst({
    where: {
      userId: user.id,
      goalTemplateId: template.id,
      category: GoalCategory.LANGUAGE,
    },
  });

  if (existingGoal) {
    await prisma.goal.update({
      where: { id: existingGoal.id },
      data: {
        title: "Đạt IELTS 7.5",
        outcome: "Nâng năng lực tiếng Anh và sẵn sàng cho kỳ thi IELTS.",
        status: GoalStatus.ACTIVE,
      },
    });
  } else {
    await prisma.goal.create({
      data: {
        userId: user.id,
        goalTemplateId: template.id,
        category: GoalCategory.LANGUAGE,
        title: "Đạt IELTS 7.5",
        outcome: "Nâng năng lực tiếng Anh và sẵn sàng cho kỳ thi IELTS.",
        status: GoalStatus.ACTIVE,
        baseline: {
          framework: "IELTS",
          estimatedOverallBand: 5.5,
        },
        constraints: {
          weekdayMinutes: 60,
          weekendMinutes: 90,
        },
      },
    });
  }

  const product = await prisma.product.upsert({
    where: { key: "levelup-pro" },
    update: {
      name: "LevelUp Pro",
      description:
        "Entitlement nền cho quota Video Lab, template nâng cao và báo cáo chuyên sâu.",
      status: ProductStatus.DRAFT,
    },
    create: {
      key: "levelup-pro",
      name: "LevelUp Pro",
      description:
        "Entitlement nền cho quota Video Lab, template nâng cao và báo cáo chuyên sâu.",
      status: ProductStatus.DRAFT,
      metadata: {
        productionCheckoutEnabled: false,
      },
    },
  });

  const monthlyPlan = await prisma.plan.upsert({
    where: {
      productId_key: {
        productId: product.id,
        key: "monthly",
      },
    },
    update: {
      name: "Pro Monthly",
      description: "Gói tháng thử nghiệm, chưa mở thanh toán production.",
      status: ProductStatus.DRAFT,
      billingInterval: BillingInterval.MONTH,
      intervalCount: 1,
      entitlementKey: "levelup.pro",
    },
    create: {
      productId: product.id,
      key: "monthly",
      name: "Pro Monthly",
      description: "Gói tháng thử nghiệm, chưa mở thanh toán production.",
      status: ProductStatus.DRAFT,
      billingInterval: BillingInterval.MONTH,
      intervalCount: 1,
      entitlementKey: "levelup.pro",
      limits: {
        videoLessonsPerDay: 20,
        activeGoals: 5,
      },
    },
  });

  await seedPrice({
    planId: monthlyPlan.id,
    currency: "USD",
    amountMinor: 990,
    provider: PaymentProvider.PAYPAL,
  });

  await seedPrice({
    planId: monthlyPlan.id,
    currency: "VND",
    amountMinor: 199000,
    countryCode: "VN",
    provider: PaymentProvider.VIETQR,
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
