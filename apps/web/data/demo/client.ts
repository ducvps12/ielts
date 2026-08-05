export type QuestKind = "main" | "side" | "bonus";
export type QuestState = "available" | "in_progress" | "completed" | "locked";

export interface DemoQuest {
  id: string;
  kind: QuestKind;
  title: string;
  description: string;
  durationMinutes: number;
  xp: number;
  gold: number;
  skill: "Reading" | "Listening" | "Writing" | "Speaking";
  state: QuestState;
  progress?: number;
}

export interface DemoActivity {
  id: string;
  title: string;
  detail: string;
  time: string;
  type: "quest" | "streak" | "checkpoint";
}

export interface DemoJourneyArc {
  id: string;
  order: number;
  title: string;
  dayRange: string;
  description: string;
  state: "completed" | "current" | "upcoming";
  progress: number;
}

export interface DemoSkill {
  name: "Listening" | "Reading" | "Writing" | "Speaking";
  band: number;
  target: number;
  change: number;
  priority: "high" | "medium" | "stable";
}

export const demoLearner = {
  id: "demo-learner",
  name: "Minh Đức",
  shortName: "Đức",
  goal: "IELTS 7.5",
  campaignDay: 17,
  totalDays: 180,
  streak: 12,
  level: 5,
  xp: 1240,
  nextLevelXp: 1500,
  gold: 184,
  timezone: "Asia/Ho_Chi_Minh",
} as const;

export const demoTodayQuests: DemoQuest[] = [
  {
    id: "quest-reading-headings",
    kind: "main",
    title: "Săn manh mối Matching Headings",
    description:
      "Làm một passage trong 20 phút, sau đó phân tích từng đáp án sai bằng Error Log.",
    durationMinutes: 45,
    xp: 40,
    gold: 12,
    skill: "Reading",
    state: "in_progress",
    progress: 35,
  },
  {
    id: "quest-error-log",
    kind: "side",
    title: "Ghi 5 lỗi quan trọng",
    description:
      "Phân loại lỗi: thiếu từ vựng, đọc nhầm keyword, bẫy paraphrase hoặc quản lý thời gian.",
    durationMinutes: 20,
    xp: 25,
    gold: 7,
    skill: "Reading",
    state: "available",
  },
  {
    id: "quest-collocations",
    kind: "bonus",
    title: "Mười collocations từ bài đọc",
    description: "Chọn cụm từ hữu ích và tự đặt ba câu có ngữ cảnh.",
    durationMinutes: 15,
    xp: 15,
    gold: 5,
    skill: "Writing",
    state: "available",
  },
];

export const demoWeeklyProgress = [
  { day: "T2", completed: 3, total: 3, current: false },
  { day: "T3", completed: 2, total: 3, current: false },
  { day: "T4", completed: 3, total: 3, current: false },
  { day: "T5", completed: 1, total: 3, current: false },
  { day: "T6", completed: 1, total: 3, current: true },
  { day: "T7", completed: 0, total: 3, current: false },
  { day: "CN", completed: 0, total: 1, current: false },
] as const;

export const demoActivities: DemoActivity[] = [
  {
    id: "activity-1",
    title: "Hoàn thành Listening Section 2",
    detail: "+40 XP · 8/10 câu đúng",
    time: "Hôm qua, 20:42",
    type: "quest",
  },
  {
    id: "activity-2",
    title: "Streak đạt 12 ngày",
    detail: "Chuỗi dài nhất hiện tại",
    time: "Hôm qua, 20:43",
    type: "streak",
  },
  {
    id: "activity-3",
    title: "Checkpoint tuần 2",
    detail: "Reading cần được ưu tiên trong tuần tới",
    time: "3 ngày trước",
    type: "checkpoint",
  },
];

export const demoJourneyArcs: DemoJourneyArc[] = [
  {
    id: "arc-baseline",
    order: 1,
    title: "Tân thủ thức tỉnh",
    dayRange: "Ngày 1–3",
    description: "Đo trình độ ban đầu và tạo Error Log đầu tiên.",
    state: "completed",
    progress: 100,
  },
  {
    id: "arc-foundation",
    order: 2,
    title: "Xây nền có kỷ luật",
    dayRange: "Ngày 4–30",
    description: "Tạo nhịp học, vá ngữ pháp và học từ theo cụm.",
    state: "current",
    progress: 52,
  },
  {
    id: "arc-skills",
    order: 3,
    title: "Rèn từng kỹ năng",
    dayRange: "Ngày 31–75",
    description: "Luyện dạng bài và chiến thuật dựa trên lỗi thật.",
    state: "upcoming",
    progress: 0,
  },
  {
    id: "arc-timed",
    order: 4,
    title: "Áp lực thời gian",
    dayRange: "Ngày 76–120",
    description: "Bấm giờ, giảm lỗi vì cuống và tăng sức bền.",
    state: "upcoming",
    progress: 0,
  },
  {
    id: "arc-mock",
    order: 5,
    title: "Mô phỏng phòng thi",
    dayRange: "Ngày 121–160",
    description: "Full section, full mock và phân tích lỗi lặp lại.",
    state: "upcoming",
    progress: 0,
  },
  {
    id: "arc-final",
    order: 6,
    title: "Final Raid",
    dayRange: "Ngày 161–180",
    description: "Ổn định phong độ và chỉ sửa lỗi có tác động lớn.",
    state: "upcoming",
    progress: 0,
  },
];

export const demoSkills: DemoSkill[] = [
  { name: "Listening", band: 6.5, target: 7.5, change: 0.5, priority: "medium" },
  { name: "Reading", band: 6.0, target: 7.5, change: 0.0, priority: "high" },
  { name: "Writing", band: 5.5, target: 7.0, change: 0.5, priority: "high" },
  { name: "Speaking", band: 6.0, target: 7.0, change: 0.5, priority: "stable" },
];

export const demoQuestList: DemoQuest[] = [
  ...demoTodayQuests,
  {
    id: "quest-listening-dictation",
    kind: "main",
    title: "Dictation đoạn nghe khó nhất",
    description: "Nghe lại và chép chính tả 10 phút từ phần mất điểm nhiều nhất.",
    durationMinutes: 30,
    xp: 35,
    gold: 10,
    skill: "Listening",
    state: "completed",
    progress: 100,
  },
  {
    id: "quest-speaking-recording",
    kind: "side",
    title: "Ghi âm Speaking Part 2",
    description: "Nói đủ hai phút và đánh dấu chỗ ngập ngừng khi nghe lại.",
    durationMinutes: 25,
    xp: 25,
    gold: 7,
    skill: "Speaking",
    state: "locked",
  },
];
