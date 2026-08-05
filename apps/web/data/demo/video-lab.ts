export interface LanguageOption {
  value: string;
  label: string;
  nativeLabel: string;
}

export interface VideoPipelineStep {
  id: string;
  label: string;
  description: string;
  state: "complete" | "active" | "pending";
}

export interface VocabularyCard {
  term: string;
  partOfSpeech: string;
  translation: string;
  definition: string;
  example: string;
  difficulty: "core" | "stretch";
}

export interface LessonModulePreview {
  title: string;
  description: string;
  metric: string;
}

export const interfaceLanguages: LanguageOption[] = [
  { value: "vi", label: "Tiếng Việt", nativeLabel: "Tiếng Việt" },
  { value: "en", label: "Tiếng Anh", nativeLabel: "English" },
  { value: "zh-CN", label: "Tiếng Trung giản thể", nativeLabel: "简体中文" },
  { value: "fr", label: "Tiếng Pháp", nativeLabel: "Français" },
];

export const learningLanguages: LanguageOption[] = [
  { value: "en", label: "Tiếng Anh", nativeLabel: "English" },
  { value: "zh-CN", label: "Tiếng Trung", nativeLabel: "中文" },
  { value: "fr", label: "Tiếng Pháp", nativeLabel: "Français" },
  { value: "es", label: "Tiếng Tây Ban Nha", nativeLabel: "Español" },
  { value: "de", label: "Tiếng Đức", nativeLabel: "Deutsch" },
  { value: "ja", label: "Tiếng Nhật", nativeLabel: "日本語" },
  { value: "ko", label: "Tiếng Hàn", nativeLabel: "한국어" },
  { value: "vi", label: "Tiếng Việt", nativeLabel: "Tiếng Việt" },
];

export const proficiencyLevels = [
  { value: "beginner", label: "Mới bắt đầu" },
  { value: "elementary", label: "Sơ cấp · A1–A2" },
  { value: "intermediate", label: "Trung cấp · B1–B2" },
  { value: "advanced", label: "Nâng cao · C1–C2" },
];

export const pipelineSteps: VideoPipelineStep[] = [
  {
    id: "source",
    label: "Kiểm tra nguồn",
    description: "Xác nhận URL, quyền sử dụng và phương thức lấy transcript.",
    state: "complete",
  },
  {
    id: "transcript",
    label: "Chuẩn hóa transcript",
    description: "Chia câu theo mốc thời gian và nhận diện ngôn ngữ.",
    state: "complete",
  },
  {
    id: "lesson",
    label: "Tạo bài học",
    description: "Từ vựng, cụm từ, câu hỏi hiểu bài và bài shadowing.",
    state: "active",
  },
  {
    id: "review",
    label: "Kiểm tra chất lượng",
    description: "Cho phép người học sửa nội dung trước khi lưu.",
    state: "pending",
  },
];

export const vocabularyPreview: VocabularyCard[] = [
  {
    term: "conscience",
    partOfSpeech: "noun",
    translation: "lương tâm",
    definition: "the inner sense that helps a person judge whether an action is right or wrong",
    example: "His conscience would not let him ignore the mistake.",
    difficulty: "core",
  },
  {
    term: "filial duty",
    partOfSpeech: "noun phrase",
    translation: "bổn phận hiếu thảo",
    definition: "a responsibility a person feels toward their parents or family",
    example: "She viewed caring for her parents as a filial duty.",
    difficulty: "stretch",
  },
  {
    term: "patron",
    partOfSpeech: "noun",
    translation: "người bảo trợ; khách quen",
    definition: "a person who supports an organization, artist or business",
    example: "The museum thanked its patrons for their support.",
    difficulty: "core",
  },
  {
    term: "civil service exam",
    partOfSpeech: "noun phrase",
    translation: "kỳ thi công chức",
    definition: "a formal examination used to qualify for a government position",
    example: "He spent a year preparing for the civil service exam.",
    difficulty: "stretch",
  },
];

export const lessonModulePreview: LessonModulePreview[] = [
  {
    title: "Transcript tương tác",
    description: "Theo dõi từng câu, bật bản dịch và lưu cụm từ theo ngữ cảnh.",
    metric: "18 đoạn",
  },
  {
    title: "Comprehension Check",
    description: "Câu hỏi ngắn kiểm tra ý chính, chi tiết và suy luận.",
    metric: "6 câu",
  },
  {
    title: "Shadowing",
    description: "Luyện nói theo các đoạn ngắn với tốc độ và số lần lặp tùy chỉnh.",
    metric: "4 đoạn",
  },
  {
    title: "Spaced Review",
    description: "Đưa từ và cụm từ đã chọn vào lịch ôn cá nhân.",
    metric: "12 thẻ",
  },
];

export const demoVideoLesson = {
  title: "How responsibility shapes difficult decisions",
  source: "YouTube preview · transcript supplied by learner",
  duration: "08:42",
  languagePair: "English → Vietnamese",
  quotaUsed: 1,
  quotaLimit: 3,
};
