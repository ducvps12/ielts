export interface MarketingBenefit {
  title: string;
  description: string;
  icon: "target" | "calendar" | "chart" | "shield";
}

export interface MarketingStep {
  number: string;
  title: string;
  description: string;
}

export interface JourneyCardData {
  slug: string;
  title: string;
  description: string;
  meta: string;
  available: boolean;
}

export interface QuestPreviewData {
  type: "main" | "side" | "bonus";
  label: string;
  title: string;
  description: string;
  duration: string;
  xp: number;
  gold: number;
}

export const marketingPreview = {
  day: 17,
  totalDays: 180,
  learnerName: "Hunter",
  streak: 12,
  weeklyProgress: 71,
  quests: [
    {
      type: "main",
      label: "Main Quest",
      title: "Săn manh mối Reading",
      description:
        "Làm một passage Matching Headings trong 20 phút, sau đó chữa lỗi bằng Error Log.",
      duration: "45 phút",
      xp: 40,
      gold: 12,
    },
    {
      type: "side",
      label: "Side Quest",
      title: "Ghi 5 lỗi quan trọng",
      description: "Phân loại lỗi theo từ vựng, đọc nhầm hoặc thiếu chiến thuật.",
      duration: "20 phút",
      xp: 25,
      gold: 7,
    },
    {
      type: "bonus",
      label: "Bonus Quest",
      title: "10 collocations",
      description: "Lấy cụm từ ngay trong bài và tự đặt ba câu mới.",
      duration: "15 phút",
      xp: 15,
      gold: 5,
    },
  ] satisfies QuestPreviewData[],
} as const;

export const benefits: MarketingBenefit[] = [
  {
    title: "Biết chính xác việc cần làm",
    description:
      "Mỗi ngày chỉ tập trung vào nhiệm vụ quan trọng nhất, thời lượng rõ ràng và có lý do cụ thể.",
    icon: "target",
  },
  {
    title: "Tiến độ có cấu trúc",
    description:
      "Lộ trình được chia thành giai đoạn, checkpoint và tuần luyện tập thay vì một danh sách vô tận.",
    icon: "calendar",
  },
  {
    title: "Đo bằng năng lực thật",
    description:
      "Error Log, mock test và xu hướng từng kỹ năng quan trọng hơn điểm XP trang trí.",
    icon: "chart",
  },
  {
    title: "Kỷ luật nhưng không cực đoan",
    description:
      "Streak, Debt Quest và ngày phục hồi được thiết kế để giúp quay lại, không làm người học xấu hổ.",
    icon: "shield",
  },
];

export const howItWorksSteps: MarketingStep[] = [
  {
    number: "01",
    title: "Xác định đích đến",
    description:
      "Chọn mục tiêu, thời hạn, lịch học và làm bài đánh giá đầu vào để hệ thống hiểu điểm xuất phát.",
  },
  {
    number: "02",
    title: "Nhận bản đồ hành trình",
    description:
      "Mục tiêu được chia thành Arc, tuần học, checkpoint và nhiệm vụ theo độ khó tăng dần.",
  },
  {
    number: "03",
    title: "Hoàn thành và chữa lỗi",
    description:
      "Mỗi nhiệm vụ đều dẫn về bằng chứng học tập: kết quả bài làm, Error Log hoặc ghi âm.",
  },
  {
    number: "04",
    title: "Điều chỉnh theo dữ liệu",
    description:
      "Hệ thống nhìn vào mức hoàn thành và điểm mock để đề xuất ưu tiên tuần tiếp theo.",
  },
];

export const journeys: JourneyCardData[] = [
  {
    slug: "ielts-75",
    title: "IELTS 7.5 — 180 ngày",
    description:
      "Xây nền, rèn từng kỹ năng, luyện áp lực thời gian và mô phỏng kỳ thi.",
    meta: "4 kỹ năng · Checkpoint hằng tuần",
    available: true,
  },
  {
    slug: "coding-foundation",
    title: "Nền tảng lập trình",
    description:
      "Một hành trình tương lai cho người cần cấu trúc học code từ số không.",
    meta: "Đang nghiên cứu nội dung",
    available: false,
  },
  {
    slug: "habit-reset",
    title: "Xây lại thói quen",
    description:
      "Một hành trình tương lai cho giấc ngủ, đọc sách và kỷ luật cá nhân.",
    meta: "Đang nghiên cứu nội dung",
    available: false,
  },
];

export const socialProofPlaceholder = {
  label: "PLACEHOLDER — CHƯA PHẢI DỮ LIỆU THẬT",
  quote:
    "Khu vực này sẽ chỉ hiển thị phản hồi đã được người dùng đồng ý công khai sau giai đoạn thử nghiệm.",
  attribution: "Chờ cohort beta đầu tiên",
} as const;

export const faqs = [
  {
    question: "LevelUp có đảm bảo tôi đạt IELTS 7.5 không?",
    answer:
      "Không. Hệ thống giúp tổ chức việc học và theo dõi tiến bộ. Kết quả phụ thuộc trình độ đầu vào, thời gian học, chất lượng luyện tập và nhiều yếu tố khác.",
  },
  {
    question: "Tôi mất gốc có dùng được không?",
    answer:
      "Lộ trình sẽ có bước đánh giá đầu vào và điều chỉnh độ khó. Nội dung chi tiết cho nhóm mất gốc cần được chuyên gia IELTS kiểm duyệt trước khi mở chính thức.",
  },
  {
    question: "Nếu bỏ lỡ một ngày thì sao?",
    answer:
      "Hệ thống ưu tiên phục hồi. Người học có thể dùng ngày nghỉ có kế hoạch, Streak Shield hoặc Debt Quest nhẹ thay vì cố học bù quá mức.",
  },
  {
    question: "Telegram bot có bắt buộc không?",
    answer:
      "Không. Telegram là kênh nhắc việc bổ sung. Toàn bộ hành trình, dữ liệu và cài đặt chính vẫn nằm trên website.",
  },
] as const;
