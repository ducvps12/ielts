import type { LegalSection } from "../components/legal/legal-document";

export const termsSections: LegalSection[] = [
  {
    title: "1. Phạm vi dịch vụ",
    paragraphs: [
      "LevelUp cung cấp công cụ tổ chức mục tiêu, nhiệm vụ học tập, tiến độ và thông báo. Dịch vụ không thay thế giáo viên, chuyên gia khảo thí hoặc kỳ thi IELTS chính thức.",
      "Các tính năng có thể thay đổi trong giai đoạn thử nghiệm và phải được thông báo phù hợp trước khi áp dụng cho người dùng thật.",
    ],
  },
  {
    title: "2. Tài khoản và hành vi sử dụng",
    paragraphs: [
      "Người dùng chịu trách nhiệm bảo vệ thông tin đăng nhập và cung cấp dữ liệu chính xác trong phạm vi cần thiết cho sản phẩm.",
    ],
    bullets: [
      "Không xâm nhập, phá hoại hoặc lạm dụng hệ thống.",
      "Không đăng nội dung vi phạm quyền sở hữu trí tuệ hoặc quyền riêng tư.",
      "Không sử dụng cơ chế cộng đồng để quấy rối, làm nhục hoặc gian lận tiến độ.",
    ],
  },
  {
    title: "3. Kết quả học tập",
    paragraphs: [
      "XP, Gold, streak và báo cáo chỉ là công cụ hỗ trợ hành vi. LevelUp không cam kết người dùng đạt một band IELTS cụ thể.",
    ],
  },
  {
    title: "4. Tạm ngừng và chấm dứt",
    paragraphs: [
      "Quy trình tạm ngừng, khôi phục và chấm dứt tài khoản phải có lý do minh bạch, cơ chế khiếu nại và nghĩa vụ lưu trữ dữ liệu phù hợp sau khi được rà soát pháp lý.",
    ],
  },
];

export const privacySections: LegalSection[] = [
  {
    title: "1. Dữ liệu dự kiến thu thập",
    paragraphs: [
      "Sản phẩm có thể cần thông tin tài khoản, mục tiêu, lịch học, kết quả nhiệm vụ, Error Log, mock score, tùy chọn thông báo và dữ liệu kỹ thuật tối thiểu để vận hành an toàn.",
    ],
  },
  {
    title: "2. Mục đích xử lý",
    paragraphs: [
      "Dữ liệu chỉ được xử lý cho mục đích cung cấp hành trình, bảo mật tài khoản, hỗ trợ người dùng, cải thiện sản phẩm và đáp ứng nghĩa vụ pháp lý đã được xác định.",
    ],
  },
  {
    title: "3. Chia sẻ và nhà cung cấp",
    paragraphs: [
      "Danh sách nhà cung cấp hạ tầng, thanh toán, email, Telegram hoặc phân tích phải được công bố trước khi các tích hợp tương ứng được bật.",
    ],
  },
  {
    title: "4. Quyền của người dùng",
    paragraphs: [
      "Luồng truy cập, chỉnh sửa, xuất, rút lại đồng ý và yêu cầu xóa dữ liệu phải được xây dựng và kiểm thử trước khi vận hành chính thức.",
    ],
  },
  {
    title: "5. Lưu trữ và bảo mật",
    paragraphs: [
      "Thời hạn lưu trữ phải được phân loại theo dữ liệu học tập, bảo mật, hỗ trợ, tài chính và audit. Không được giữ dữ liệu vô thời hạn chỉ vì thuận tiện kỹ thuật.",
    ],
  },
];

export const cookieSections: LegalSection[] = [
  {
    title: "1. Cookie thiết yếu",
    paragraphs: [
      "Cookie hoặc cơ chế lưu trữ tương đương có thể được dùng để duy trì phiên đăng nhập, bảo mật và lưu lựa chọn giao diện cần thiết.",
    ],
  },
  {
    title: "2. Phân tích và cá nhân hóa",
    paragraphs: [
      "Cookie không thiết yếu chỉ được bật sau khi có cơ chế đồng ý phù hợp. Nhà cung cấp, thời hạn và mục đích phải được công bố rõ ràng.",
    ],
  },
  {
    title: "3. Quản lý lựa chọn",
    paragraphs: [
      "Người dùng cần có cách xem và thay đổi lựa chọn cookie. Từ chối cookie không thiết yếu không được ngăn truy cập các chức năng cốt lõi.",
    ],
  },
];
