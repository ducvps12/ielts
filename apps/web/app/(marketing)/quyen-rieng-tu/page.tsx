import type { Metadata } from "next";

import { LegalDocument } from "../../../components/legal/legal-document";
import { privacySections } from "../../../data/legal";

export const metadata: Metadata = {
  title: "Chính sách quyền riêng tư — Bản dự thảo",
  description: "Bản dự thảo chính sách quyền riêng tư LevelUp IELTS.",
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Chính sách quyền riêng tư"
      description="Cấu trúc dự thảo về dữ liệu cá nhân, mục đích xử lý và quyền của người dùng."
      version="Draft 0.1"
      effectiveDate="Chưa xác định"
      sections={privacySections}
    />
  );
}
