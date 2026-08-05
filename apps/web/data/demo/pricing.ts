export interface DemoPlan {
  key: "free" | "pro";
  name: string;
  eyebrow: string;
  amountMinor: number;
  currency: "VND" | "USD";
  intervalLabel: string;
  description: string;
  features: string[];
  status: "available" | "draft";
}

export interface PaymentMethodPreview {
  id: "paypal" | "vietqr" | "binance-pay";
  name: string;
  markets: string;
  status: "planned" | "review";
  description: string;
}

export const demoPlans: DemoPlan[] = [
  {
    key: "free",
    name: "LevelUp Free",
    eyebrow: "CORE LOOP",
    amountMinor: 0,
    currency: "VND",
    intervalLabel: "không giới hạn thời gian trong beta",
    description:
      "Bắt đầu một mục tiêu, nhận nhiệm vụ hằng ngày và theo dõi tiến độ cốt lõi.",
    features: [
      "Một mục tiêu đang hoạt động",
      "Main, Side và Bonus Quest",
      "Streak, XP và tiến độ tuần",
      "Video Lab giới hạn ở bản preview",
    ],
    status: "available",
  },
  {
    key: "pro",
    name: "LevelUp Pro",
    eyebrow: "DRAFT PLAN",
    amountMinor: 990,
    currency: "USD",
    intervalLabel: "mỗi tháng · giá đề xuất",
    description:
      "Nhiều mục tiêu, quota Video Lab cao hơn và báo cáo chuyên sâu. Chưa mở bán.",
    features: [
      "Tối đa năm mục tiêu hoạt động",
      "Video Lab và spaced review nâng cao",
      "Template ngôn ngữ và mục tiêu mở rộng",
      "Báo cáo dài hạn và export có kiểm soát",
    ],
    status: "draft",
  },
];

export const paymentMethodPreviews: PaymentMethodPreview[] = [
  {
    id: "paypal",
    name: "PayPal",
    markets: "Quốc tế",
    status: "planned",
    description:
      "Ưu tiên cho subscription quốc tế sau khi hoàn thành sandbox, webhook verification và reconciliation.",
  },
  {
    id: "vietqr",
    name: "VietQR / chuyển khoản ngân hàng",
    markets: "Việt Nam · VND",
    status: "planned",
    description:
      "Dùng mã thanh toán duy nhất và provider xác nhận trạng thái. ACB có thể là tài khoản nhận tiền, không phải business logic riêng.",
  },
  {
    id: "binance-pay",
    name: "Binance Pay",
    markets: "Experimental",
    status: "review",
    description:
      "Mặc định tắt cho tới khi có merchant access chính thức, đánh giá pháp lý, kế toán và vận hành theo thị trường.",
  },
];
