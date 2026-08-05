import type { Metadata } from "next";

import { LegalDocument } from "../../../components/legal/legal-document";
import { termsSections } from "../../../data/legal";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng — Bản dự thảo",
  description: "Bản dự thảo điều khoản sử dụng LevelUp IELTS.",
};

export default function TermsPage() {
  return (
    <LegalDocument
      title="Điều khoản sử dụng"
      description="Cấu trúc dự thảo quy định việc sử dụng nền tảng LevelUp IELTS."
      version="Draft 0.1"
      effectiveDate="Chưa xác định"
      sections={termsSections}
    />
  );
}
